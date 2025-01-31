const kafka = require("./kafka");
const { sendToOriginalTopic, sendToDLQ } = require("./producer");

const dlqConsumer = kafka.consumer({ groupId: "dlq-consumer-group" });

const DLQ_TOPIC = "dlq-topic";
const MAX_RETRY_ATTEMPTS = 5;
const BASE_DELAY = 60000; // 1 minute

const processDLQMessage = async (message) => {
  const dlqMessage = JSON.parse(message.value.toString());
  console.log("Processing DLQ message:", dlqMessage);
  // We can implement custom logic here to process the message
  // for example validation of the message
  //we can look on the error and conditionally try to fix it here.
  //if we can't fix it we can send it to the DLQ again.
};

const runDLQConsumer = async () => {
  await dlqConsumer.connect();
  await dlqConsumer.subscribe({
    topic: DLQ_TOPIC,
    fromBeginning: true,
  });

  await dlqConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const dlqMessage = JSON.parse(message.value.toString());
      console.log(dlqMessage);
      const retryCount = dlqMessage.retryCount || 0;

      if (retryCount >= MAX_RETRY_ATTEMPTS) {
        console.log(
          `Max retries reached for message. Flagging for manual review:`,
          dlqMessage
        );

        // Implement logic to flag for manual review (e.g., save to a database, send an alert)
        return;
      }

      const delay = BASE_DELAY * Math.pow(2, retryCount);
      console.log(
        `Scheduling retry attempt ${retryCount + 1} in ${delay / 1000} seconds`
      );

      setTimeout(async () => {
        try {
          await processDLQMessage(message);
          await sendToOriginalTopic(dlqMessage);
        } catch (error) {
          console.error(`Retry attempt ${retryCount + 1} failed:`, error);

          // Update retry count and send back to DLQ
          await sendToDLQ(dlqMessage, DLQ_TOPIC);
        }
      }, delay);
    },
  });
};

module.exports = { runDLQConsumer };

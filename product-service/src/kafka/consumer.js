const kafka = require("./kafka");
const { inventoryUpdateOrder } = require("../services/productService");
const { produceDLQEvent } = require("./producer");

const consumer = kafka.consumer({ groupId: "product-service-group" });

const MAX_RETRIES = 3; // Maximum number of retry attempts

const processMessage = async (topic, value) => {
  switch (topic) {
    case "order-placed":
      console.log("Order placed:", value);
      await inventoryUpdateOrder(value.productId, value.quantity, value.action);
      break;
    default:
      console.error("Unknown topic:", topic);
  }
};

const runConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topics: ["order-placed"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value.toString());

      let retries = 0;
      let success = false;

      while (retries <= MAX_RETRIES && !success) {
        try {
          console.log(`Processing message from topic ${topic}:`, value);

          // Process the message
          await processMessage(topic, value.dataReceived);

          success = true;
          console.log(`Successfully processed message from topic ${topic}`);
        } catch (error) {
          retries++;
          console.error(
            `Error processing message from topic ${topic} (Attempt ${retries}/${MAX_RETRIES}):`,
            error
          );

          if (retries > MAX_RETRIES) {
            console.error(
              `Max retries reached for message from topic ${topic}. Skipping message:`,
              value
            );
            value['originalTopic'] = topic;
            produceDLQEvent(value);
            break;
          }

          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * Math.pow(2, retries - 1))
          );
        }
      }

      if (!success) {
        console.error(
          `Failed to process message from topic ${topic} after max retries:`,
          value
        );
      
      }
    },
  });
};

module.exports = { runConsumer };


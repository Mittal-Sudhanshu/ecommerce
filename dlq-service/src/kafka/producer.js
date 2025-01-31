const kafka = require("./kafka");
const producer = kafka.producer();

const sendToOriginalTopic = async (message) => {
  await producer.connect();
  const producedData={
    dataReceived:message.dataReceived,
    retryCount:message.retryCount+1
  }
  await producer.send({
    topic: message.originalTopic,
    messages: [{ value: JSON.stringify(producedData) }],
  });
  await producer.disconnect();
  console.log(
    `Message successfully resent to original topic ${message.originalTopic}`
  );
};

const sendToDLQ = async (message, topic) => {
  await producer.connect();
  const producedData={
    dataReceived:message.dataReceived,
    retryCount:message.retryCount+1
  }
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(producedData) }],
  });
  await producer.disconnect();
  console.log(`Message sent to DLQ: ${topic}`);
};

module.exports = { sendToOriginalTopic, sendToDLQ };

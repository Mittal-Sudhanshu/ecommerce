const kafka = require('./kafka');

const producer = kafka.producer();

const produceProductCreatedEvent = async (data) => {
  await producer.connect();
  const producedData={
    dataReceived:data,
    retryCount:0
  }
  await producer.send({
    topic: 'product-created',
    messages: [
      { value: JSON.stringify(producedData) },
    ],
  });
  await producer.disconnect();
};

const produceInventoryUpdatedEvent = async (data) => {
  await producer.connect();
  const producedData={
    dataReceived:data,
    retryCount:0
  }
  await producer.send({
    topic: 'inventory-updated',
    messages: [
      { value: JSON.stringify(producedData) },
    ],
  });
  await producer.disconnect();
};

const produceDLQEvent = async (data) => {
  await producer.connect();
  await producer.send({
    topic: 'dlq-topic',
    messages: [
      { value: JSON.stringify(data) },
    ],
  });
  await producer.disconnect();
};

module.exports = { produceProductCreatedEvent, produceInventoryUpdatedEvent, produceDLQEvent };

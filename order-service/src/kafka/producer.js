const kafka = require('./kafka');

const producer = kafka.producer();

const produceOrderPlacedEvent = async (data) => {
  await producer.connect();
  const producedData={
    dataReceived:data,
    retryCount:0
  }
  await producer.send({
    topic: 'order-placed',
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


module.exports = { produceOrderPlacedEvent, produceDLQEvent };
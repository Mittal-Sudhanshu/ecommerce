const kafka = require('./kafka');

const producer = kafka.producer();

const produceUserRegisteredEvent = async (data) => {
  await producer.connect();
  const producedData={
    dataReceived:data,
    retryCount:0
  }
  await producer.send({
    topic: 'user-registered',
    messages: [
      { value: JSON.stringify(producedData) },
    ],
  });
  await producer.disconnect();
};

const produceUserUpdatedEvent = async (data) => {
  await producer.connect();
  const producedData={
    dataReceived:data,
    retryCount:0
  }
  await producer.send({
    topic: 'user-updated',
    messages: [
      { value: JSON.stringify(producedData) },
    ],
  });
  await producer.disconnect();
};

module.exports = { produceUserRegisteredEvent, produceUserUpdatedEvent };


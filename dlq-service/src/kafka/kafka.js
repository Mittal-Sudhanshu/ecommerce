require("dotenv").config();
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "dlq-service",
  brokers: [process.env.KAFKA_BROKER],
});

module.exports = kafka;

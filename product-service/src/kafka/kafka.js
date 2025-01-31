require('dotenv').config();

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "product-service",
  brokers: [process.env.KAFKA_BROKER],
});

module.exports = kafka;

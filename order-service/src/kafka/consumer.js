const kafka = require("./kafka");
const { registerUser, updateUser } = require("../services/userServices");
const {
  createProductInventory,
  inventoryUpdateService,
} = require("../services/productServices");
const { produceDLQEvent } = require("./producer");

const consumer = kafka.consumer({ groupId: "order-service-group" });

const MAX_RETRIES = 3; // Maximum number of retry attempts

const processMessage = async (topic, value) => {
  switch (topic) {
    case "user-registered":
      console.log("User registered:", value);
      await registerUser(value);
      break;
    case "user-updated":
      console.log("User updated:", value);
      await updateUser(value.userId, value.userUpdatedData);
      break;
    case "product-created":
      console.log("Product created:", value);
      await createProductInventory(value);
      break;
    case "inventory-updated":
      console.log("Inventory updated:", value);
      await inventoryUpdateService(value);
      break;
    default:
      console.error("Unknown topic:", topic);
  }
};

const runConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topics: [
      "user-registered",
      "user-updated",
      "product-created",
      "inventory-updated",
    ],
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
            value["originalTopic"] = topic;
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

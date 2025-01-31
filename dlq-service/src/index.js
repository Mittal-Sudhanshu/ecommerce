const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { runDLQConsumer } = require("./kafka/consumer");

dotenv.config();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "DLQ Service" });
});


runDLQConsumer().catch(console.error);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

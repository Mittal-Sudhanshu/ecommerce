const express = require("express");
const connectDB = require("../config/database");
const dotenv = require("dotenv");
const port = process.env.PORT || 5002;
const productRoutes = require("./routes/productRoutes");
const { runConsumer } = require("./kafka/consumer");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Product API" });
});

connectDB();
runConsumer().catch(console.error);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

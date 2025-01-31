const express = require("express");
const connectDB = require("../config/database");
const dotenv = require("dotenv");
const OrderRoutes = require("./routes/orderRoutes");
const { runConsumer } = require("./kafka/consumer");

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/orders", OrderRoutes);
app.get("/", (req, res) => {
  res.status(200).json({message:"Order API"})
});

connectDB();
runConsumer().catch(console.error);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

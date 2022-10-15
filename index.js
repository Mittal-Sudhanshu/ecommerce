const express = require("express");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const myOrderRoutes = require("./routes/myOrderRoutes");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
connectDB();
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/myOrder", myOrderRoutes);
app.listen(PORT, () => {
  console.log("Server started on PORT", PORT);
});

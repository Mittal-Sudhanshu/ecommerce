const mongoose = require("mongoose");
const myOrders = mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  paymentId: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const MyOrders = mongoose.model("MyOrders", myOrders);
module.exports = MyOrders;

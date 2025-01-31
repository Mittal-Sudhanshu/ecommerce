const { produceOrderPlacedEvent } = require("../kafka/producer");
const Order = require("../models/Order");
const ProductInventory = require("../models/ProductInventory");
const User = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");

//order created by user
const createOrderService = async (data) => {
  const { userId, productId, quantity } = data;
  const findProductInventory = await ProductInventory.findOne({
    productId: productId,
  });
  if (!findProductInventory) {
    throw new Error("Product not found");
  }
  const findUser = await User.findOne({
    userId: userId,
  });
  if (!findUser) {
    throw new Error("User not found");
  }
  const orderId = uuidv4();
  const orderData = {
    user_Id: findUser._id,
    product_Id: findProductInventory._id,
    quantity: quantity,
    order_Id: orderId,
  };

  if (findProductInventory.quantity - quantity < 0) {
    throw new Error("Not suffcient quantity available");
  }
  const inventoryUpdate = await ProductInventory.findOneAndUpdate(
    { productId: productId },
    { $inc: { quantity: -quantity } }
  );

  if (!inventoryUpdate) {
    throw new Error("Failed to update inventory");
  }

  const order = new Order(orderData);
  const savedOrder = await order.save();
  if (!savedOrder) {
    throw new Error("Failed to create order");
  }

  //trigger event Order Created to product service for inventory update
  const orderDataEvent = {
    productId: productId,
    quantity: quantity,
    action: "sub",
  };
  const returnOrder = await Order.findOne({ order_Id: orderId }).populate(
    "user_Id"
  );
  await produceOrderPlacedEvent(orderDataEvent);
  return returnOrder;
};

//get details about order
const findOrderService = async (orderId) => {
  const order = await Order.findOne({ order_Id: orderId }).populate("user_Id");
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

const findAllOrders = async () => {
  const orders = await Order.find().populate("user_Id");
  if (!orders) {
    throw new Error("Orders not found");
  }
  return orders;
};
module.exports = { createOrderService, findOrderService, findAllOrders };

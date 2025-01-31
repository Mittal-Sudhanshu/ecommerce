const {
  createOrderService,
  findOrderService,
  findAllOrders,
} = require("../services/orderServices");

//create order controller
const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const order = await createOrderService({ userId, productId, quantity });
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//get order details controller

const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ message: "Order Id is required" });
    }
    const order = await findOrderService(orderId);
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await findAllOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
module.exports = { createOrder, getOrder, getOrders };


const { createOrder, getOrder, getOrders } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

//create order controller
router.post("/create", authMiddleware, createOrder);

//get order details controller
router.get("/get/:orderId", getOrder);

//get all orders
router.get("/getall", getOrders);

module.exports = router;

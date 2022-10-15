const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const MyOrders = require("../controllers/myOrdersController");
const router = express.Router();

router.route("/").get(protect, MyOrders);

module.exports = router;

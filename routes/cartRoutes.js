const express = require("express");
const {
  createOrder,
  cartItems,
  updateCartItem,
  completeOrder,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, cartItems);
router.route("/checkout").post(protect, completeOrder);
router.route("/:id").patch(protect, updateCartItem);
module.exports = router;

const asyncHandler = require("express-async-handler");
const MyOrders = require("../models/myOrders");
const getOrders = asyncHandler(async (req, res) => {
  try {
    const myOrders = await MyOrders.find({ User: { _id: req.user._id } })
      .populate("productId")
      .populate("User");
    res.status(200).json(myOrders);
  } catch (err) {
    console.log(err);
  }
});
module.exports = getOrders;

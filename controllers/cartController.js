const asyncHandler = require("express-async-handler");
// const { findById } = require('../models/cart');
const Cart = require("../models/cart");
const Product = require("../models/product");
const MyOrders = require("../models/myOrders");

const createOrder = asyncHandler(async (req, res) => {
  const newOrder = {
    productId: req.body.productId,
    count: req.body.count != null ? parseInt(req.body.count) : 1,
    User: req.user,
  };
  try {
    const stock = await Product.findById(newOrder.productId);
    if (newOrder.count > stock.stock) {
      return res.status(400).send({ error: "Insufficient Quantity" });
    }
    const product = Cart.create(newOrder);

    const orders = await Cart.find().populate("productId");
    return res
      .status(201)
      .send({ success: "Order Created Succesfully", orders });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "unable to create order", err });
  }
});
const cartItems = asyncHandler(async (req, res) => {
  const key = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { details: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const cart = await Cart.find({ User: { _id: req.user._id } })
    .populate("productId")
    .populate("User");
  res.status(200).send(cart);
});
const updateCartItem = asyncHandler(async (req, res) => {
  var update = req.body;
  const cartItemId = req.params.id;
  try {
    if(update.count==0){
      const cartItem = await Cart.findByIdAndDelete({ _id: cartItemId });
      res.status(200).send(cartItem);
      return;
    }
    const cartItem = await Cart.findByIdAndUpdate(
      { _id: cartItemId },
      { $set: update },
      { new: true }
    );
    res.status(200).send(cartItem);
    console.log(cartItem);
  } catch (err) {
    console.log(err);
  }
});
// const completeOrder=asyncHandler(async(req,res)=>{

// console.log(cartItemsId);
// checkOut.cartItemsId.array.forEach(async(element) => {
// const product=await Product.findById(cartItemsId.productId)
// const find = await Cart.findById({cartItemsId})
// console.log(find)
// const update={stock:product.stock-element.count}
// await Product.findByIdAndUpdate(product.id,update,{new:true});
// });

// })

const completeOrder = asyncHandler(async (req, res) => {
  try {
    id = req.body.id;
    paymentId = req.body.paymentId;
    // idProd = req.body.productId
    const find = await Cart.findById(id);
    console.log(find.productId);
    const prodId = await Product.findById(find.productId);
    if (prodId.stock >= find.count) {
      const update = { stock: prodId.stock - find.count };
      await Product.findByIdAndUpdate(find.productId, update, { new: true });
      const addToMyOrders = await MyOrders.create({
        User: req.user,
        paymentId: paymentId,
        productId: prodId,
        quantity: find.count,
      });
      await Cart.findByIdAndDelete(find);
      console.log(addToMyOrders);
      res.status(200).json({status:"order created successfully"});
    }
    console.log(find);
  } catch (error) {
    res.status(400).json({ message: "Some error occured" });
    console.log(error);
  }
});
module.exports = { createOrder, cartItems, completeOrder,updateCartItem };

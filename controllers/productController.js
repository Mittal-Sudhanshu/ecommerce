const asyncHandler = require("express-async-handler");
const { reset } = require("nodemon");
const Product = require("../models/product");

const createProduct = asyncHandler(async (req, res) => {
  //only for admin panel
  const { title, details, category, price, stock } = req.body;
  if ((!title, !details, !category, !price, !stock)) {
    res.status(400).json(("Fill in all the required Fields"));
    return;
  }
  try {
    const products = await Product.create({
      title,
      details,
      category,
      seller: req.user,
      price,
      stock,
    });
    res.status(201).json(products);
  } catch (err) {
    res.status(400).json("Some error occured");
    console.log(err);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  var update = req.body;
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      { $set: update },
      { new: true }
    );
    res.status(200).json(product);
    console.log(product);
  } catch (err) {
    console.log(err);
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  const product = req.params.id;
  try {
    const product1 = await Product.findByIdAndDelete({ _id: product });
    res.status(200).json(product1);
  } catch (err) {
    console.log(err);
  }
});

const allProducts = asyncHandler(async (req, res) => {
  const key = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { details: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const prod = await Product.find(key).populate("seller");
  res.status(200).send(prod);
});

const categoryProduct=asyncHandler(async (req, res) => {
  const key = req.query.category
  const prod=await Product.find({category:req.query.category}).populate("seller").populate("category");
  res.status(200).send(prod);
});

module.exports = { categoryProduct,createProduct, allProducts, updateProduct, deleteProduct };

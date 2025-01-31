const {
  createProductService,
  inventoryUpdateService,
  findProductService,
  updateProductService,
  findAllProductsService,
} = require("../services/productService");

//create product
const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = await createProductService(data);
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//product price update
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { price } = req.body;
    if (!productId || !price) {
      return res.status(400).send("Price is required");
    }
    const product = await updateProductService(productId, price);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
//inventory update
const inventoryUpdate = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity,action } = req.body;
    if (!productId || !quantity) {
      return res.status(400).send("Quantity is required");
    }
    const product = await inventoryUpdateService(productId, quantity,action);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// get product details

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await findProductService(productId);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await findAllProductsService();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { createProduct, inventoryUpdate, getProduct,updateProduct,getAllProducts };

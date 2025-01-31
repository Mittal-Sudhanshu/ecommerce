const {
  produceProductCreatedEvent,
  produceInventoryUpdatedEvent,
} = require("../kafka/producer");
const Product = require("../models/Product");
const { v4: uuidv4 } = require("uuid");

//create product
const createProductService = async (data) => {
  const { name, price, quantity } = data;
  const productId = uuidv4();
  const productData = {
    name,
    price,
    quantity,
    productId,
  };
  const product = new Product(productData);
  const savedProduct = await product.save();
  if (!savedProduct) {
    throw new Error("Failed to create product");
  }

  //when product created publish event to order service for product data update
  const productDataEvent = {
    productId,
    quantity,
  };
  await produceProductCreatedEvent(productDataEvent);
  return savedProduct;
};

//get product details
const findProductService = async (productId) => {
  const product = await Product.findOne({ productId });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

//get all products
const findAllProductsService = async () => {
  const products = await Product.find({});
  if (!products) {
    throw new Error("No products found");
  }
  return products;
};
//product price update
const updateProductService = async (productId, price) => {
  const product = await Product.findOne({ productId });
  if (!product) {
    throw new Error("Product not found");
  }
  product.price = price;
  const updatedProduct = await product.save();
  if (!updatedProduct) {
    throw new Error("Failed to update product");
  }
  return updatedProduct;
};

//inventory update
const inventoryUpdateService = async (productId, quantity, action) => {
  const product = await Product.findOne({ productId });
  if (!product) {
    throw new Error("Product not found");
  }
  if (action === "add") {
    product.quantity = product.quantity + quantity;
  } else {
    product.quantity = product.quantity - quantity;
    if (product.quantity < 0) {
      product.quantity = 0;
    }
  }
  const updatedProduct = await product.save();
  if (!updatedProduct) {
    throw new Error("Failed to update product");
  }
  //create an event for updating product data at order service with appropriate data
  const productData = {
    productId,
    quantity,
    action: action === "add" ? "add" : "sub",
  };
  await produceInventoryUpdatedEvent(productData);
  return updatedProduct;
};

//order placed event triggered
const inventoryUpdateOrder = async (productId, quantity, action) => {
  const product = await Product.findOne({ productId });
  if (!product) {
    throw new Error("Product not found");
  }
  if (action === "add") {
    product.quantity = product.quantity + quantity;
  } else {
    product.quantity = product.quantity - quantity;
  }
  const updatedProduct = await product.save();
  if (!updatedProduct) {
    throw new Error("Failed to update product");
  }

  return updatedProduct;
};

module.exports = {
  createProductService,
  findProductService,
  findAllProductsService,
  inventoryUpdateService,
  inventoryUpdateOrder,
  updateProductService,
};

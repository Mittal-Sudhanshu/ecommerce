const ProductInventory = require("../models/ProductInventory");

// create product on product create event
const createProductInventory = async (data) => {
  const { productId, quantity } = data;

  const productInventory = new ProductInventory({
    productId,
    quantity,
  });
  const savedProductInventory = await productInventory.save();
  if (!savedProductInventory) {
    throw new Error("Failed to create product inventory");
  }
  return savedProductInventory;
};

// inventory update on product update event

const inventoryUpdateService = async (data) => {
  const { productId, quantity, action } = data;
  const productInventory = await ProductInventory.findOne({ productId });
  if (!productInventory) {
    throw new Error("Product not found");
  }
  if (action === "add") {
    productInventory.quantity = productInventory.quantity + quantity;
  } else {
    productInventory.quantity = productInventory.quantity - quantity;
    if(productInventory.quantity < 0){
      productInventory.quantity = 0;
    }
  }
  const updatedProductInventory = await productInventory.save();
  if (!updatedProductInventory) {
    throw new Error("Failed to update product inventory");
  }
  return updatedProductInventory;
};

module.exports = { createProductInventory, inventoryUpdateService };

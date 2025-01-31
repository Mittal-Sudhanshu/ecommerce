const mongoose = require("mongoose");


const productInventorySchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});


const ProductInventory = mongoose.model('ProductInventory', productInventorySchema);

module.exports = ProductInventory;
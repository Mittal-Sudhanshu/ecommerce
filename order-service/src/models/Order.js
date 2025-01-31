const mongoose=require("mongoose");

const orderSchema = new mongoose.Schema({
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product_Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ProductInventory'
    },
    quantity: {
        type: Number,
        required: true
    },
    order_Id: {
        type: String,
        required: true,
        unique: true 
    }
},{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
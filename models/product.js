const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    details: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // image:[{
    //     type:String,
    //     required:false
    // }],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // rating:{
    //     type:Number,
    //     // default:0.0
    // }
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

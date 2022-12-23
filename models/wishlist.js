const mongoose=require('mongoose');
const wishlistSchems=mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }
    
}, { timestamps: true })
const Wishlist=mongoose.model("Wishlist",wishlistSchems);
module.exports=Wishlist;
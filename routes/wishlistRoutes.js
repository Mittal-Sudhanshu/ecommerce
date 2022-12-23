const express = require("express");
const router=express.Router();

const {
    getWishlist, addToWishlist, deleteFromWishlist
} =require('../controllers/wishlistController');

const {protect}=require('../middleware/authMiddleware');
router.route('/').get(protect,getWishlist).post(protect,addToWishlist).delete(protect,deleteFromWishlist);



module.exports=router;
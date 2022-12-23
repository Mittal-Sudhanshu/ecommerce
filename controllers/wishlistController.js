const asyncHandler = require("express-async-handler");
const Wishlist = require("../models/wishlist");

const getWishlist = asyncHandler(async (req, res) => {
  const key = req.query.search
    ? {
        $or: [
          { product: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const wishlist = await Wishlist.find(key);
  res.status(200).send(wishlist);
});

const addToWishlist = asyncHandler(async (req, res) => {
  const product = req.body.product;
  try {
    const wishlist = await Wishlist.create({ product });
    res.status(200).json({ wishlist });
  } catch (e) {
    res.status(400).json({ message: "some error occured" });
  }
});

const deleteFromWishlist = asyncHandler(async (req, res) => {
  const wishlistItem = req.query.wishlist;
  try {
    const WishlistItem = await Wishlist.findByIdAndDelete(wishlistItem);
    res.status(200).json({ wishlistItem });
  } catch (e) {
    res.status(400).json({ message: "some error occured" });
  }
});

module.exports = { getWishlist, addToWishlist, deleteFromWishlist };

const express = require("express");
const {
  createProduct,
  allProducts,
  updateProduct,
  categoryProduct,
  deleteProduct,
} = require("../controllers/productController");
const { adminCheck } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/category").get(categoryProduct);
router.route("/").post(adminCheck, createProduct).get(allProducts);

router.route("/:id").patch(adminCheck, updateProduct);
router.route("/delete/:id").delete(adminCheck, deleteProduct);

// router.route('/')

module.exports = router;

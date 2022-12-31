const express = require("express");

const upload = require("../multer/multer");

const {
  createCategory,
  getAllCategories,
} = require("../controllers/categoryController");
const { adminCheck } = require("../middleware/authMiddleware");
const router = express.Router();

// router.route("/").post(adminCheck, createCategory).get(getAllCategories);
router.route("/").post(adminCheck,upload.single('categoryImage'), createCategory).get(getAllCategories);

module.exports = router;

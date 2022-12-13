const express = require("express");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categoryController");
const { adminCheck } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(adminCheck, createCategory).get(getAllCategories);

module.exports = router;

const express = require("express");
const {
  createCatgeory,
  getAllCategories,
} = require("../controllers/categoryController");
const { adminCheck } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(adminCheck, createCatgeory).get(getAllCategories);

module.exports = router;

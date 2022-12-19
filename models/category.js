const mongoose = require("mongoose");
const categoryModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
});
const Category = mongoose.model("Category", categoryModel);
module.exports = Category;

const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json( "Fields can't be empty");
    return;
  }
  try {
    const category = await Category.create({
      name
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json("Some error occured");
    console.log(err);
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  const key = req.query.search
    ? {
        $or: [{ name: { $regex: req.query.search, $options: "i" } }],
      }
    : {};

  const categ = await Category.find(key);
  res.status(200).send(categ);
});

module.exports = { createCategory, getAllCategories };

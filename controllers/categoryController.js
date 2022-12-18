const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const fs=require('fs');
const cloudinary = require("../cloudinary/cloudinary");

const createCategory = asyncHandler(async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, 'Images');
  const { name } = req.body;
  const { path } = req.file;
  const newPath = await uploader(path);
  const image=newPath;
  fs.unlinkSync(path);
  console.log(image);
  if (!name,!image) {
    res.status(400).json( "Fields can't be empty");
    return;
  }
  try {
    const category = await Category.create({
      name,image,
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

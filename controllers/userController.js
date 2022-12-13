const asyncHandler = require("express-async-handler");
const generateToken = require("../config/token");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  handleEmail,
  hanldeName,
  handlePass,
  handleOtp,
} = require("../auth/otpgenerator");
//creating a new user
const registerUser = asyncHandler(async (req, res) => {
  // const {name,email,password} = req.body
  const email = handleEmail();
  const name = hanldeName();
  const password = handlePass();
  //if all the fields are empty
  if (!name || !email || !password) {
    res.status(400).json({ error: "Please fill in all the input fields" });
  }

  //if email is already registered
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "User with this email already exists" });
  }

  //salting the password
  var salt = bcrypt.genSaltSync(10);

  //if there is no error while signing up then a create a new user model
  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password, salt),
  });
  //saving the user
  const result = user.save();

  //if the user gets registered then res the document
  if (result) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
      password: user.password,
      token: generateToken(user.id),
    });
  }
  //if the user does not gets registered for any reason
  else {
    res.status(400).json({ error: "Failed to create the user" });
  }
});

//verifying a user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //finding the email
  const userFound = await User.findOne({ email });
  //comparing the password
  if (!userFound) {
    res.status(400).json({ error: "invalid credentials" });
    return;
  }
  if (bcrypt.compareSync(password, userFound.password)) {
    res.status(201).json({
      _id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      isAdmin: userFound.isAdmin,
      password: userFound.password,
      token: generateToken(userFound.id),
    });
  } else {
    res.status(400).json({ error: "Invalid Credentials" });
  }
});
// const fogotPassword = asyncHandler(async(req, res))
module.exports = { registerUser, authUser };

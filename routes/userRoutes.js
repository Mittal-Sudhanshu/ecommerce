const express = require("express");
const {
  otpGenerator,
  handleEmail,
  name,
  email,
  password,
} = require("../auth/otpgenerator");
const otpValidator = require("../auth/otpValidator");
const { registerUser, authUser } = require("../controllers/userController");
const router = express.Router();
//post routing for creating a new user
router.route("/").post(otpGenerator);
//post route for checking otp
router.route("/validate").post(otpValidator, registerUser);
//post routing for authenticating a user
router.post("/login", authUser);
module.exports = router;

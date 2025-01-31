const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const generateToken = require("../utils/jwt");
const {
  produceUserRegisteredEvent,
  produceUserUpdatedEvent,
} = require("../kafka/producer");

//user registered
const registerUser = async (data) => {
  const { email } = data;
  const findUser = await User.findOne({ email });
  const userId = uuidv4();
  if (findUser) {
    throw new Error("User already exists");
  }
  
  const userData = {
    name: data.name,
    email: data.email,
    password: data.password,
    userId: userId,
    role: data.role,
  };
  const user = new User(userData);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const savedUser = await user.save();
  if (!savedUser) {
    throw new Error("Failed to create user");
  }
  //trigger event User Register
  //create an object to send to the event bus which will contain userid name and adress
  const userRegisteredData = {
    userId: savedUser.userId,
    name: savedUser.name,
    email: savedUser.email,
    street: data.street,
    city: data.city,
    state: data.state,
    zip: data.zip,
  };
  //send the event to the event bus
  await produceUserRegisteredEvent(userRegisteredData);
  return savedUser;
};

//get all users

const findAllUsers = async () => {
  const users = await User.find();
  if (!users) {
    throw new Error("No users found");
  }
  return users;
};
//get user details
const findUser = async (userId) => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

//user login
const loginUserService = async (data) => {
  const { email, password } = data;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new Error("User does not exists");
  }
  const comparePassword = await bcrypt.compare(password, findUser.password);
  if (!comparePassword) {
    throw new Error("Incorrect password");
  }
  const tokenData = {
    _id: findUser._id,
    email: findUser.email,
    userId: findUser.userId,
    role: findUser.role,
  };
  const token = generateToken(tokenData);
  const user = {
    name: findUser.name,
    email: findUser.email,
    userId: findUser.userId,
  };
  return { user, token };
};

//user updated

const updateUser = async (userId, userData) => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error("User not found");
  }
  //create update user data
  if (userData.name) {
    user.name = userData.name;
  }
  const updatedUser = await user.save();

  if (!updatedUser) {
    throw new Error("Failed to update user");
  }
  //create an event for updatting user data at order service with appropriate data
  const userUpdatedData = {};
  if (userData.name) {
    userUpdatedData.name = userData.name;
  }
  if (userData.street) {
    userUpdatedData.street = userData.street;
  }
  if (userData.city) {
    userUpdatedData.city = userData.city;
  }
  if (userData.state) {
    userUpdatedData.state = userData.state;
  }
  if (userData.zip) {
    userUpdatedData.zip = userData.zip;
  }
  //send the event to the event bus
  if (Object.keys(userUpdatedData).length > 0) {
    await produceUserUpdatedEvent({userId, userUpdatedData});
  }
  return updatedUser;
};

module.exports = { registerUser, findUser,findAllUsers, updateUser, loginUserService };

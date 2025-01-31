const User = require("../models/UserModel");

//user registered event
const registerUser = async (data) => {
  const { name, email, street, city, state, zip, userId } = data;

  if (!name || !email || !street || !city || !state || !zip || !userId) {
    throw new Error("Invalid data");
  }
  const createData = {
    name,
    email,
    address: {
      street,
      city,
      state,
      zip,
    },
    userId,
  };
  const user = new User(createData);
  const savedUser = await user.save();
  if (!savedUser) {
    throw new Error("Failed to create user");
  }
  return savedUser;
};

//user update event
const updateUser = async (userId, userData) => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error("User not found");
  }
  if (userData.name) {
    user.name = userData.name;
  }
  if (userData.street) {
    user.address.street = userData.street;
  }
  if (userData.city) {
    user.address.city = userData.city;
  }
  if (userData.state) {
    user.address.state = userData.state;
  }
  if (userData.zip) {
    user.address.zip = userData.zip;
  }
  const updatedUser = await user.save();
  if (!updatedUser) {
    throw new Error("Failed to update user");
  }
  return updatedUser;
};

module.exports = { registerUser, updateUser };

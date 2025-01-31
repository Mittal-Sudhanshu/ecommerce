const { model } = require("mongoose");
const {
  registerUser,
  updateUser,
  loginUserService,
  findUser,
  findAllUsers,
} = require("../services/userService");

//user registered
const createUser = async (req, res) => {
  try {
    const { name, email, password, street, city, state, zip, role } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !street ||
      !city ||
      !state ||
      !zip ||
      !role
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (role !== "user" && role !== "admin") {
      return res
        .status(400)
        .json({ message: "Role should be either user or admin" });
    }
    const newUser = await registerUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please give email and password for login" });
    }
    const loginData = await loginUserService({ email, password });

    return res.status(200).json(loginData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//user updated

const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }
    const updatedUser = await updateUser(userId, req.body);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//get user
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }
    const user = await findUser(userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers(); // Assuming findUser without arguments fetches all users
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, editUser, loginUser, getUser, getAllUsers };

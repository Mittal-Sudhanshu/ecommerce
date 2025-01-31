const {
  createUser,
  editUser,
  loginUser,
  getUser,
  getAllUsers,
} = require("../controllers/userController");

const router = require("express").Router();

//user registered
router.post("/register", createUser);

//user login
router.post("/login", loginUser);

//user updated
router.put("/update/:userId", editUser);

//find user
router.get("/find/:userId", getUser);

//get all users
router.get("/allusers", getAllUsers);

module.exports = router;

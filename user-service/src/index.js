const express = require("express");
const connectDB = require("../config/database");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/userRoutes");
const { produceUserRegisteredEvent, produceUserUpdatedEvent } = require("./kafka/producer");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/users", UserRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "User API" });
});

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

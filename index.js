const express = require("express");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const myOrderRoutes = require("./routes/myOrderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const app = express();
// const Server =require("socket.io");
// const io=Server(3000);

// io.on("connection",(socket)=>{
//   socket.emit("connection");
//   console.log("connected");
// })

const wishlistRoutes = require("./routes/wishlistRoutes");
const dotenv = require("dotenv");
const { PromiseProvider } = require("mongoose");
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
connectDB();
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/myOrder", myOrderRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/wishlist",wishlistRoutes);
const server=app.listen(PORT, () => {
  console.log("Server started on PORT", PORT);
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:4000/",
    // credentials: true,
  },
  
});

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("connection")
  // io.on ("test", (message) =>console.log("hello world"));
  // socket.on()
  
  // socket.on ("check",(message) =>console.log(message));
});
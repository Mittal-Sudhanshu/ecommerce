const express = require("express");
const connectDB = require("./src/db/db");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const myOrderRoutes = require("./src/routes/myOrderRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const app = express();
// const Server =require("socket.io");
// const io=Server(3000);

// io.on("connection",(socket)=>{
//   socket.emit("connection");
//   console.log("connected");
// })

const wishlistRoutes = require("./src/routes/wishlistRoutes");
const dotenv = require("dotenv");
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
    origin: "http://localhost:4000",
    // credentials: true,
  },
  
});

io.on("connection", (socket) => {
  console.log(socket.id);
  // io.on ("test", (message) =>console.log("hello world"));
  // socket.on ("msg",(message) =>console.log(message));
  // socket.on ("check",(message) =>console.log(message));

});
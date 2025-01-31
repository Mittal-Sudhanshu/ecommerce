const { createProduct, inventoryUpdate, getProduct, updateProduct, getAllProducts } = require("../controllers/productController");
const { authMiddleware, adminMiddleware } = require("../middleware/authmiddleware");



const router = require("express").Router();

//create product
router.post("/create",authMiddleware, adminMiddleware, createProduct);

//price update
router.put("/updateprice/:productId",authMiddleware, adminMiddleware, updateProduct);

//inventory update
router.put("/updateinventory/:productId",authMiddleware, adminMiddleware, inventoryUpdate);

//get product details
router.get("/get/:productId", getProduct);

//get all listed products
router.get("/getallproducts/all", getAllProducts);

module.exports = router;

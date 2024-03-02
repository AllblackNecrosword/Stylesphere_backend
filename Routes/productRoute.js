const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createProduct, getProducts, getProductsingle, deleteProduct, updateProduct } = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
const router = express.Router();


router.post("/",protect,upload.single("image"),createProduct);
router.get("/",protect,getProducts)
router.get("/:id",protect,getProductsingle)
router.delete("/:id",protect,deleteProduct)
router.patch("/:id",protect,updateProduct)

module.exports=router;

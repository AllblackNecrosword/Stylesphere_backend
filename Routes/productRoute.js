const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createProduct, getProducts, getProductsingle, deleteProduct, updateProduct,totalProducts, getMenData } = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
const router = express.Router();

router.post("/",upload.single("image"),createProduct);//protect hatako cha
router.get("/",getProducts)
router.get("/totalproducts",totalProducts)
router.get("/:id",getProductsingle)
router.delete("/:id",deleteProduct)
router.patch("/:id",updateProduct)


module.exports=router;

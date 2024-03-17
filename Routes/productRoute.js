const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createProduct, getProducts, getProductsingle, deleteProduct,totalProducts } = require("../controllers/productController");
const upload = require("../utils/imageUpload")
const router = express.Router();

router.post("/",upload.single("file"),createProduct);//protect hatako cha
router.get("/",getProducts)
router.get("/totalproducts",totalProducts)
router.get("/:id",getProductsingle)
router.delete("/:id",deleteProduct)
// router.patch("/:id",updateProduct)


module.exports=router;

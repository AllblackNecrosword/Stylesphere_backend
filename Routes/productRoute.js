const express = require("express");
const { createProduct, getProducts, getProductsingle, deleteProduct,totalProducts, updateProduct, getreviewUpdate } = require("../controllers/productController");
const upload = require("../utils/imageUpload")
const router = express.Router();

router.post("/",upload.single("file"),createProduct);
router.get("/",getProducts)
router.get("/totalproducts",totalProducts)
router.get("/:id",getProductsingle)
router.delete("/:id",deleteProduct)
router.patch("/:id", upload.single("file"), updateProduct);
router.patch("/review/:id",getreviewUpdate)

module.exports=router;


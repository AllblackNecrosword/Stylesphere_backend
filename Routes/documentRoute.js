const express = require("express");
const {addtoCart}=require("../controllers/documentController");
const router = express.Router();

router.post("/",addtoCart);


module.exports=router;
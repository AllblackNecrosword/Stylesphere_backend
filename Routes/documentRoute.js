const express = require("express");
const {addtoCart, showaddtocart}=require("../controllers/documentController");
const router = express.Router();

router.post("/",addtoCart);
router.get("/getcartdata/:userId", showaddtocart);



module.exports=router;
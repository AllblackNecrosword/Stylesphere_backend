const express = require("express");
const {addtoCart, showaddtocart,addtofav,showFav, updatecartQuantity}=require("../controllers/documentController");
const router = express.Router();

router.post("/",addtoCart);
router.get("/getcartdata/:userId", showaddtocart);
router.post("/getfavdata",addtofav);
router.get("/getfavdata/:userId",showFav);
router.put("/updatecart",updatecartQuantity)



module.exports=router;
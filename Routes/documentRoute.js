const express = require("express");
const {addtoCart, showaddtocart,addtofav,showFav, updatecartQuantity, deleteCartData, deleteWishlistdata}=require("../controllers/documentController");
const router = express.Router();

router.post("/",addtoCart);
router.get("/getcartdata/:userId", showaddtocart);
router.post("/getfavdata",addtofav);
router.get("/getfavdata/:userId",showFav);
router.put("/updatecart",updatecartQuantity);
router.delete("/delete/:userId/:productId",deleteCartData);
router.delete("/deletewish/:userId/:productId",deleteWishlistdata);


module.exports=router;
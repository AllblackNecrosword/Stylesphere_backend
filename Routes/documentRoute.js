const express = require("express");
const {addtoCart, showaddtocart,addtofav,showFav}=require("../controllers/documentController");
const router = express.Router();

router.post("/",addtoCart);
router.get("/getcartdata/:userId", showaddtocart);
router.post("/getfavdata",addtofav);
router.get("/getfavdata/:userId",showFav);



module.exports=router;
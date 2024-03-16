const express = require("express");
const router = express.Router();
const {getMenData, getWomenData, getKidData}=require("../controllers/userproductController")

router.get("/getmenData", getMenData); 
router.get("/getwomenData", getWomenData); 
router.get("/getkidData", getKidData); 


module.exports=router;
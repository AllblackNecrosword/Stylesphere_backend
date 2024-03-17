const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload")
const {getMenData, getWomenData, getKidData, tryOut}=require("../controllers/userproductController")

router.get("/getmenData", getMenData); 
router.get("/getwomenData", getWomenData); 
router.get("/getkidData", getKidData); 
router.post("/upload",upload.single("file"),tryOut)


module.exports=router;
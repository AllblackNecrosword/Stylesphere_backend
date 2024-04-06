const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");
const protect = require("../middleware/authMiddleware");
const {
  getMenData,
  getWomenData,
  getKidData,
  searchProduct,
  createReview,
  getReview,
} = require("../controllers/userproductController");

router.get("/getmenData", getMenData);
router.get("/getwomenData", getWomenData);
router.get("/getkidData", getKidData);
router.get("/search", searchProduct);
router.post("/postreview", createReview);
router.get("/getreview/:productId", getReview);

module.exports = router;

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
  getallUser
} = require("../controllers/userproductController");

router.get("/getmenData", getMenData);
router.get("/getwomenData", getWomenData);
router.get("/getkidData", getKidData);
router.get("/search", searchProduct);
router.post("/postreview", createReview);
router.get("/getreview/:productId", getReview);
router.get("/getalluser", getallUser);

module.exports = router;

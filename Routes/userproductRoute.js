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
  getallUser,
  getsingleMenProduct,
  getsingleWomenProduct,
  getsingleKidProduct,
  getlatestMenData,
  getlatestWomenData,
  getlatestKidsData,
  handleUserMangement,
  getsingleUserDetail

} = require("../controllers/userproductController");

router.get("/getmenData", getMenData);
router.get("/getwomenData", getWomenData);
router.get("/getkidData", getKidData);
router.get("/search", searchProduct);
router.post("/postreview", createReview);
router.get("/getreview/:productId", getReview);
router.get("/getalluser", getallUser);
router.get("/getsingleMenproduct/:category", getsingleMenProduct);
router.get("/getsingleWomenproduct/:category", getsingleWomenProduct);
router.get("/getsingleKidproduct/:category", getsingleKidProduct);
router.get("/getlatestMenData", getlatestMenData);
router.get("/getsingleWomenProduct", getlatestWomenData);
router.get("/getsingleKidProduct", getlatestKidsData);
router.get("/getsingleuserdetail/:id", getsingleUserDetail);
router.put('/user/:userid/role',handleUserMangement)



module.exports = router;

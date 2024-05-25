const express = require("express");
const { AddBanner, getHerobanner } = require("../controllers/contentController");
const router = express.Router();
const upload = require("../utils/imageUpload");

router.patch(
  "/Herobanner",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  AddBanner
);
// router.patch("/Herobanner", upload.single("file"), AddBanner);
// router.patch("/Herobanner", AddBanner);
router.get("/",getHerobanner);
module.exports = router;

const express = require("express");
const { AddBanner } = require("../controllers/contentController");
const router = express.Router();
const upload = require("../utils/imageUpload");

router.patch("/Herobanner", upload.single("file"), AddBanner);
// router.patch("/Herobanner", AddBanner);

module.exports = router;

const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  image1: { type: String },
  bannerText1: { type: String },
  image2: { type: String },
  bannerText2: { type: String },
  bannercomment1: { type: String },
  bannercomment2: { type: String },
});

const BannerAdd = mongoose.model("Banner", contentSchema);
module.exports = { BannerAdd };


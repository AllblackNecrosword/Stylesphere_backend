const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  image1: { type: String },
  bannerText1: { type: String },
});

const BannerAdd = mongoose.model("Banner", contentSchema);
module.exports = { BannerAdd };


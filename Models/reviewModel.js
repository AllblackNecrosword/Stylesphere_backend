const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    productId : {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: [false, "Please add product name"],
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewSchema);
module.exports = { Reviews };

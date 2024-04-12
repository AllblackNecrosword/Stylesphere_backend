const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId:{
    type:String,
  }
});

const CartAdd = mongoose.model("Cart", cartSchema);
module.exports = { CartAdd };

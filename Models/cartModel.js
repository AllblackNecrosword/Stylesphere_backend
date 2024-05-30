
const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      size: { // Add size field
        type: String,
      },
    },
  ],
});

const CartAdd = mongoose.model("Cart", cartSchema);
module.exports = { CartAdd };

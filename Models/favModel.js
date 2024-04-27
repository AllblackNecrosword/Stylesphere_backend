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
    },
  ],
});


const FavAdd = mongoose.model("Wishlist", cartSchema);
module.exports = { FavAdd };

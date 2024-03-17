const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add product name"],
    trim: true,
  },
  category: {
    type: String,
    enum: ['men', 'women', 'kids'], // Define allowed categories
    required: [true, "Please a category"],
    trim: true,
  },
  productType: {
    type: String,
    enum: ['clothes', 'shoes', 'accessories'], // Define allowed product types
    required: true,
    trim: true,
},
  quantity: {
    type: String,
    required: [true, "Please add a quantity"],
    trim: true,
    min:0,
  },
  price: {
    type: String,
    required: [true, "Please add a price"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    trim: true,
  },
  sizes: [
    {
      type: String,
      trim: true,
    }
  ],
  image: String
},
{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = {Product};

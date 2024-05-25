const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },

  products: [],

  totalPrice: {
    type: Number,
    require: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cancellationStatus :{
    type:String,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };

const mongoose = require("mongoose");

const returnOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  isDefective: {
    type:Boolean,
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ReturnOrder = mongoose.model("ReturnOrder", returnOrderSchema);

module.exports = ReturnOrder;

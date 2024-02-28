const mongoose = require("mongoose");
//Create Schema
const signupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneno:{
      type:Number,
      required:true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
//Create Model
const Signupdata = mongoose.model("UserData", signupSchema);
module.exports = Signupdata;
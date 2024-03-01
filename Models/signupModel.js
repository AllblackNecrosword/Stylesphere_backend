const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Create Schema
const signupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    phoneno: {
      type: Number,
      required: [true, "Please enter a valid phoneno"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please enter a email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
  },
  { timestamps: true }
);

//Encrypt the password before storing it to db
signupSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    //Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

//Create Model
const Signupdata = mongoose.model("UserData", signupSchema);
module.exports = Signupdata;

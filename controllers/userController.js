const Signupdata = require("../Models/signupModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signuphandler = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    const { name, phoneno, email, password } = req.body;
    //validation
    if (!name || !phoneno || !email || !password) {
      res.status(400);
      throw new Error("Please fill in the required fields");
    }

    //password validation
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be up to 6 characters");
    }

    //check if user email already exists
    const userExists = await Signupdata.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Email has already been used");
    }

    //Encrypt the password

    const userAdded = await Signupdata.create({
      name: name,
      phoneno: phoneno,
      email: email,
      password,
    });

    if (userAdded) {
      const { _id, name, phoneno, email, password } = userAdded;
      res.status(201).json({
        _id,
        name,
        phoneno,
        email,
        password,
      });
    } else {
      res.status(400);
      throw new Error("Error in creating a user");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};



const loginhandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email, password)) {
      return res.status(400).json({ message: "Fill up the detail" });
    }
    const user = await Signupdata.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }
    const Validpassword = await bcrypt.compare(password, user.password);
    if (!Validpassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    //Check if the user is admin

    if (user.isAdmin) {
      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .json({ message: "Login sucessful for admin", data: { user, token } });
    } else {
      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .json({ message: "Login sucessful", data: { user, token } });
    }
  } catch (error) {
    console.log(error);
  }
};

//logout handler
const logouthandler = async (req, res) => {
  //send HTTP-only cookie
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), //1day
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Sucessfully logged Out" });
};

//Get user data for user profile
const getUser = async (req, res) => {
  const user = await Signupdata.findById(req.user._id);

  if (user) {
    const { _id, name, phoneno, email, password } = user;
    res.status(201).json({
      _id,
      name,
      phoneno,
      email,
      password,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const loginStatus = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  //verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  } else {
    return res.json(false);
  }

  // res.status(200).json({message:"Loginstatus working"});
};

module.exports = {
  loginhandler,
  signuphandler,
  logouthandler,
  getUser,
  loginStatus,
};

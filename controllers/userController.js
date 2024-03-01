const Signupdata = require("../Models/signupModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const signuphandler = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Add this line to log the request body
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

    //Generate Token
    const token = generateToken(userAdded._id);
    //HTTP only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // expires in 1 day
      secure: true,
      sameSite: "none",
    });
    if (userAdded) {
      const { _id, name, phoneno, email, password } = userAdded;
      res.status(201).json({
        _id,
        name,
        phoneno,
        email,
        password,
        token,
      });
    }else{
      res.status(400);
      throw new Error("Error in creating a user");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


//Login user
const loginhandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please fill in the required fields");
    }

    // Find user by email
    const user = await Signupdata.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid  password" });
    }

    // Generate token
    const token = generateToken(user._id);
    //HTTP only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // expires in 1 day
      secure: true,
      sameSite: "none",
    });

    if (user && passwordMatch) {
      // If email and password are correct, send success response
      const { _id, email, password } = user;
      res.status(200).json({
        _id,
        email,
        password,
        token,
      });
    }else{
      res.status(400)
      throw new Error("Invalid Email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
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

module.exports = {
  loginhandler,
  signuphandler,
  logouthandler,
  getUser,
};

// const Signupdata = require("../Models/signupModel");
// const jwt = require("jsonwebtoken");

// const protect = async (req, res,next) => {
//   try {
//     const token = req.cookies.token;
//     if(!token){
//         return res.status(401).json({ message: "Not authorized, please login" });
//     }
//     //verify the token 
//     const verified =jwt.verify(token,process.env.JWT_SECRET)
//     //get user id form token 
//     user = await Signupdata.findById(verified.id).select("-password")

//     if (!user){
//         return res.status(401).json({ message: "User not found" });
//     }
//     req.user=user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token, please login again" });
//   }
// };

// module.exports = protect;
const jwt = require("jsonwebtoken");
const Signupdata = require("../Models/signupModel");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, please login ok" });
    }
    
    // Verify the token 
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified token:", verified.id);

    // Get user ID from token 
    const user = await Signupdata.findById(verified.id).select("-password");
    console.log("User:", user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token, please login again" });
  }
};

module.exports = protect;

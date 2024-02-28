const bcrypt = require("bcryptjs");
const Signupdata = require("../Models/signupModel");


const loginhandler=async(req,res)=>{
    try {
        const { email, password } = req.body;
        
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
    
        // If email and password are correct, send success response
        res.status(200).json({ message: "Login successful", user });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
}


const signuphandler=async(req,res)=>{
    try {
        console.log("Request Body:", req.body); // Add this line to log the request body
        const { name,phoneno,email, password } = req.body;
        const userAdded = await Signupdata.create({
            name: name,
            phoneno:phoneno,
            email: email,
            password: password,
        });
        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}


module.exports={
    loginhandler,
    signuphandler
}
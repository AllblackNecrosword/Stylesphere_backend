const express = require("express");
const { loginhandler, signuphandler, logouthandler, getUser, loginStatus } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login",loginhandler)
router.post("/signup",signuphandler);
router.get("/logout",logouthandler);
router.get("/getuser",protect,getUser);
router.get("/loggedin",loginStatus);

module.exports =router;
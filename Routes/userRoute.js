const express = require("express");
const { loginhandler, signuphandler, logouthandler, getUser } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login",loginhandler)
router.post("/signup",signuphandler);
router.get("/logout",logouthandler);
router.get("/getuser",protect,getUser);

module.exports =router;
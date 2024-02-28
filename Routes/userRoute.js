const express = require("express");
const { loginhandler, signuphandler } = require("../controllers/userController");
const router = express.Router();

router.post("/login",loginhandler)
router.post("/signup",signuphandler);

module.exports =router;
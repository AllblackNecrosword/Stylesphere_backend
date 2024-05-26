const express = require("express");
const {
  loginhandler,
  signuphandler,
  logouthandler,
  getUser,
  loginStatus,
  getuserNumber
} = require("../controllers/userController");
const Protect =require("../middleware/authMiddleware")
const router = express.Router();

router.post("/login", loginhandler);
router.post("/signup", signuphandler);
router.get("/logout", logouthandler);
router.get("/getuser",Protect,getUser);
router.get("/loggedin", loginStatus);
router.get("/totalusers", getuserNumber);
// router.get("/mugi",tryout)

module.exports = router;

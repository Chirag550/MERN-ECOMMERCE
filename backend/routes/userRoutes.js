const express = require("express");

const router = express.Router();

const usercontroller = require("../controllers/userController");

router.post("/register", usercontroller.registerUser);
router.post("/login", usercontroller.loginUser);
router.post("/password/forgot", usercontroller.forgetPassword);
router.get("/logout", usercontroller.Logout);
router.post("/reset/:token", usercontroller.resetPassword);

module.exports = router;

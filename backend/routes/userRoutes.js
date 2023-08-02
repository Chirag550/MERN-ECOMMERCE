const express = require("express");

const router = express.Router();

const usercontroller = require("../controllers/userController");
const { isAuth, authorizeRoles } = require("../middleware/isAuth");

router.post("/register", usercontroller.registerUser);
router.post("/login", usercontroller.loginUser);
router.post("/password/forgot", usercontroller.forgetPassword);
router.get("/logout", usercontroller.Logout);
router.post("/reset/:token", usercontroller.resetPassword);
router.get("/me", isAuth, usercontroller.getUserDetails);
router.put("/password/update", isAuth, usercontroller.updatePassword);
router.put("/password/update", isAuth, usercontroller.updatePassword);
router.put("/me/update", isAuth, usercontroller.updateProfile);
router.get(
  "/admin/users",
  isAuth,
  authorizeRoles("admin"),
  usercontroller.getAllUser
);
router.get(
  "/admin/user/:id",
  isAuth,
  authorizeRoles("admin"),
  usercontroller.getSingleUser
);
router.put("/admin/user/:id", usercontroller.updateRole);

router.delete("/admin/user/:id", usercontroller.deleteUser);
module.exports = router;

const express = require("express");
const cors = require("cors");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser); //Checked

router.route("/login").post(loginUser); //Checked

router.route("/password/forgot").post(forgotPassword); //Checked

router.route("/password/reset/:token").put(resetPassword); //checked

router.route("/password/update").put(isAuthenticatedUser, updatePassword); //checked

router.route("/logout").get(logout); // checked

router.route("/me").get(isAuthenticatedUser, getUserDetails); //checked

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;

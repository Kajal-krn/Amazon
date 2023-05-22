const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/logout").get(logout);
Router.route("/password/forgot").post(forgotPassword);
Router.route("/password/reset/:token").put(resetPassword);
Router.route("/me").get(isAuthenticatedUser, getUserDetails);
Router.route("/password/update").put(isAuthenticatedUser, updatePassword);
Router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = Router;
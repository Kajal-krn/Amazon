const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require("../controllers/userController");
const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/logout").get(logout);
Router.route("/password/forgot").post(forgotPassword);
Router.route("/password/reset/:token").put(resetPassword);

module.exports = Router;
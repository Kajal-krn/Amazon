const express = require("express");
const { registerUser, loginUser, logout } = require("../controllers/userController");
const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/logout").get(logout);

module.exports = Router;
const express = require("express");
const { registerUser } = require("../controllers/userController");
const Router = express.Router();

Router.route("/register").post(registerUser);

module.exports = Router;
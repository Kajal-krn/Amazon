const express = require("express");
const { newOrder } = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middleware/auth");

const Router = express.Router();

Router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = Router;
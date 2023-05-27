const express = require("express");
const {processPayment, sendStripeApiKey} = require("../controllers/paymentController")
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

const Router = express.Router();

Router.route("/payment/process").post(isAuthenticatedUser, processPayment);
Router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = Router;
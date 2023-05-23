const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const Router = express.Router();

Router.route("/order/new").post(isAuthenticatedUser, newOrder);

Router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

Router.route("/orders/me").get(isAuthenticatedUser, myOrders);

Router.route("/orders/all").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

module.exports = Router;
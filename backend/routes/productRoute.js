const express = require("express");
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController");
const isAuthenticatedUser = require("../middleware/auth");

const Router = express.Router();

Router.route("/products").get(isAuthenticatedUser, getAllProducts);
Router.route("/products/new").post(isAuthenticatedUser, createProduct);
Router.route("/products/:id").get(getProductDetails).put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct);

module.exports = Router;
const express = require("express");
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController");
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

const Router = express.Router();

Router.route("/products")
    .get(getAllProducts);

Router.route("/admin/products/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

Router.route("/admin/products/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

Router.route("/products/:id")
    .get(getProductDetails);

module.exports = Router;
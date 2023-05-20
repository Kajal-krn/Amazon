const express = require("express");
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController");

const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/products/new").post(createProduct);
Router.route("/products/:id").get(getProductDetails).put(updateProduct).delete(deleteProduct);

module.exports = Router;
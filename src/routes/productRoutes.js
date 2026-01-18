// External Module
const express = require("express");
const productRoutes = express.Router();

const productContoller = require("../controllers/productContoller")


productRoutes.post("/admin/addproduct", productContoller.addProduct);
productRoutes.get("/admin/product/:productId", productContoller.getProductDetails);
productRoutes.get("/admin/getproduct/list", productContoller.getProductList);
productRoutes.post("/admin/edit-product", productContoller.postEditProduct);

module.exports = productRoutes;

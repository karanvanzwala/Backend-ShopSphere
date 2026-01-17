// External Module
const express = require("express");
const adminRoutes = express.Router();


//local module

const adminController = require("../controllers/adminContoller")

const productContoller = require("../controllers/productContoller")


adminRoutes.get("/admin/list", adminController.getAdminUsers);


adminRoutes.post("/admin/adduser", adminController.postAddUser);
adminRoutes.get("/admin/user/:userId", adminController.getUserDetails);
adminRoutes.get("/admin/favourites/list", adminController.getToFavouriteList);
adminRoutes.post("/admin/favourites", adminController.postAddToFavourite);
adminRoutes.post("/admin/edit-user", adminController.postEditUser);
adminRoutes.post("/admin/delete-user/:userId", adminController.postDeleteUser);




adminRoutes.post("/admin/addproduct", productContoller.addProduct);
adminRoutes.get("/admin/product/:productId", productContoller.getProductDetails);
adminRoutes.get("/admin/getproduct/list", productContoller.getProductList);
adminRoutes.post("/admin/edit-product", productContoller.postEditProduct);

module.exports = adminRoutes;

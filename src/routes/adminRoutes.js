// External Module
const express = require("express");
const adminRoutes = express.Router();


//local module

const adminController = require("../controllers/adminContoller")


adminRoutes.get("/admin/list", adminController.getAdminUsers);


adminRoutes.post("/admin/adduser", adminController.postAddUser);
adminRoutes.get("/admin/user/:userId", adminController.getUserDetails);
adminRoutes.get("/admin/user/:userId", adminController.getUserDetails);

adminRoutes.post("/admin/favourites", adminController.postAddToFavourite);

module.exports = adminRoutes;

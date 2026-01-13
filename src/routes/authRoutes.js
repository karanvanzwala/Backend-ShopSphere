// External Module
const express = require("express");
const authRoutes = express.Router();

const authController = require("../controllers/authController")


authRoutes.post("/admin/login", authController.postLogin);
authRoutes.post("/logout", authController.postLogout);

module.exports = authRoutes;
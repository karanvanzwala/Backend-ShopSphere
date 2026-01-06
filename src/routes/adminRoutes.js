// External Module
const express = require("express");
const adminRoutes = express.Router();


adminRoutes.get("/admin", (req, res, next) => {
    res.send("admin route")
    console.log("admin route")
    // res.render("home", {
    //   registeredHomes: registeredHomes,
    //   pageTitle: "airbnb Home",
    // });
});

module.exports = adminRoutes;

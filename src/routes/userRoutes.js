// External Module
const express = require("express");
const userRouter = express.Router();


userRouter.get("/user", (req, res, next) => {
    res.send("user route")
    console.log("user route")
    
});

module.exports = userRouter;

const Product = require("../models/product")


exports.addProduct = (req, res, next) => {





    // console.log("<<<<<<<<")

    const {
        name,
        link,
        email,
        description } = req.body;

    console.log(req.body, "<<<Karan>>>")
    console.log(req.file, "<<<vanz>>>")

    const photo = req.file.path;

    const product = new Product({
        name,
        email,
        link,
        photo,
        description,
    });
    product.save().then(() => {
        res.send({
            message: "Product Saved successfully!",
        });

    });
}
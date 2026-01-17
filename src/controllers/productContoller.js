const Product = require("../models/product")
const fs = require("fs");

exports.addProduct = (req, res, next) => {
    const {
        name,
        link,
        email,
        description } = req.body;

    // console.log(req.body, "<<<Karan>>>")
    // console.log(req.file, "<<<vanz>>>")
    const photo = req.file.destination.replace(/^src\//, '') + req.file.filename;

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

exports.getProductList = (req, res, next) => {

    Product.find().then((row) => {
        res.send({
            productData: row,
        })
    }).catch((error) => {
        console.log("error while fetch product", error)
    })
}

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId
    Product.findById(productId).then((product) => {
        res.send({
            productData: product,
        })
    })
};

exports.postEditProduct = (req, res, next) => {
    const {
        id,
        name,
        email,
        link,

        description } = req.body;

    // const photo = req.file.destination.replace(/^src\//, '') + req.file.filename;

    Product.findById(id).then((product) => {
        product.name = name,
            product.link = link;
        product.email = email;
        // if (req.file) {
        //     product.photo = photo;
        // }

        if (req.file) {
            fs.unlink(`src/${product.photo}`, (err) => {
                if (err) {
                    console.log("Error while deleting file ", err);
                }
            });
            product.photo = req.file.destination.replace(/^src\//, '') + req.file.filename;
        }
        product.description = description
        product.save().then((result) => {
            res.send({
                message: "Product edited successfully",
            });
        })
    }).catch(error => { console.log(error) });

}
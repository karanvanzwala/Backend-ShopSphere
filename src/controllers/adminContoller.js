const User = require("../models/user")

exports.postAddUser = (req, res, next) => {

    const { fullName,
        email,
        mobile,
        address,
        gender } = req.body;
    const user = new User(fullName,
        email,
        mobile,
        address,
        gender);

 
    user.save();
    res.send({
        message: "User created successfully!",
    });


    // res.render("host/home-added", {
    //     pageTitle: "Home Added Successfully",
    //     currentPage: "homeAdded",
    // });
};

exports.getAdminUsers = (req, res, next) => {
    User.fetchAll((registeredUsers) =>
        res.send({
            userData: registeredUsers,
        })
    )

};
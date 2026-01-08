const User = require("../models/user")
const Favourite = require("../models/favourite")

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
};

exports.getAdminUsers = (req, res, next) => {
    User.fetchAll((registeredUsers) =>
        res.send({
            userData: registeredUsers,
        })
    )

};
exports.getUserDetails = (req, res, next) => {
    const userID = req.params.userId
    User.findById(userID, users => {
        console.log("userFound", users)
        res.send({
            userData: users,
        })
    })

};
exports.postAddToFavourite = (req, res, next) => {

    // console.log(req.body.id, ",,,,")
    // return

    Favourite.addToFavourites(req.body.id, error => {
        if (error) {
            console.log("Error while marking favourite: ", error);
            res.send({
                message: "already maked as favourite",
            });
        } else {
            res.send({
                message: "Add favourites successfully",
            });
        }
    })




}
const User = require("../models/user")
const Favourite = require("../models/favourite")
const bcrypt = require("bcryptjs");

exports.postAddUser = (req, res, next) => {

    const { fullName,
        email,
        mobile,
        address,
        gender, password } = req.body;


    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                fullName,
                email,
                mobile,
                address,
                gender, password: hashedPassword,
            });
            return user.save();
        })
        .then(() => {
            res.send({
                message: "User created successfully!",
            });
        }).catch(err => {
            console.log(err, "<<>>")

        })

};

exports.getAdminUsers = (req, res, next) => {

    User.find().then((row) => {
        res.send({
            userData: row,
        })
    }).catch((error) => {
        console.log("error while fetch user", error)
    })

};
exports.getUserDetails = (req, res, next) => {
    const userID = req.params.userId
    User.findById(userID).then((users) => {
        res.send({
            userData: users,
        })
    })

};
exports.postAddToFavourite = (req, res, next) => {
    const userId = req.body.id

    Favourite.findOne({ userid: userId }).then((fav) => {
        if (fav) {
            res.send({
                message: "already maked as favourite",
            });
        } else {
            fav = new Favourite({ userid: userId })
            fav.save().then(() => {
                res.send({
                    message: "Add favourites successfully",
                });
            })
        }
    }).catch(error => {
        console.log(",,")
    })

    // const fav = new Favourite(userId)

    // fav.save().then(result => {
    //     res.send({
    //         message: "already maked as favourite",
    //     });

    // }).catch(error => {
    //     res.send({
    //         message: "Add favourites successfully",
    //     });
    // })
}

exports.getToFavouriteList = (req, res, next) => {

    Favourite.find().then(favourites => {
        favourites = favourites.map((fav => fav.userid.toString()))
        User.find().then(regUser => {
            const favouritesUsers = regUser.filter((userss) => favourites.includes(userss._id.toString())
            )
            console.log(favouritesUsers, "ppp.....")
        })

    })
}


exports.postEditUser = (req, res, next) => {
    const { id, fullName, email, mobile, address, gender } = req.body;
    // const user = new User(fullName, email, mobile, address, gender, id);

    User.findById(id).then((user) => {
        user.fullName = fullName,
            user.email = email,
            user.mobile = mobile,
            user.address = address,
            user.gender = gender
        user.save().then((result) => {
            res.send({
                message: "Home edited successfully",
            });
        })
    }).catch(error => { console.log(error) });

}
exports.postDeleteUser = (req, res, next) => {
    const userID = req.params.userId

    User.findByIdAndDelete(userID).then(() => {
        res.send({
            message: "User deleted successfully",
        });
    }).catch(error => {
        console.log("Error while deleting user: ", error);
        res.send({
            message: "Error while deleting user",
        });
    })



}

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
    User.fetchAll().then((row) => {
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

        console.log(".....")
        res.send({
            userData: users,
        })
    })

};
exports.postAddToFavourite = (req, res, next) => {
    const userId = req.body.id

    const fav = new Favourite(userId)

    fav.save().then(result => {
        res.send({
            message: "already maked as favourite",
        });

    }).catch(error => {
        res.send({
            message: "Add favourites successfully",
        });
    })
}

exports.getToFavouriteList = (req, res, next) => {

    Favourite.getFavourites().then(favourites => {
        favourites = favourites.map((fav => fav.userid))
        User.fetchAll().then(regUser => {
            const favouritesUsers = regUser.filter((userss) => favourites.includes(userss._id.toString())
            )
            console.log(favouritesUsers, "ppp.....")
        })

    })
}


exports.postEditUser = (req, res, next) => {
    const { id, fullName, email, mobile, address, gender } = req.body;
    const user = new User(fullName, email, mobile, address, gender, id);

    user.save().then(() => {
        res.send({
            message: "Home edited successfully",
        });
    }).catch(error => { console.log(error) });
}
exports.postDeleteUser = (req, res, next) => {
    const userID = req.params.userId

    User.deleteById(userID).then(() => {
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

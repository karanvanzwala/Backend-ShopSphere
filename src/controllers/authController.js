const User = require("../models/user");
const bcrypt = require("bcryptjs");


exports.postLogin = async (req, res, next) => {

    // req.isLoggedIn = true
    const { email, password } = req.body;
    console.log("Login attempt:123", { email, password });

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(422).json({
            message: "User Does not exist",

        });
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(422).json({
            message: "Invalid password",

        });
    }
    // res.cookie("isLoggedIn", true)
    // req.session.isLoggedIn = user
    req.session.user = user
    await req.session.save()

    // console.log(user, "<<<>>>")

    res.json({
        message: "Login details received",
        data: {
            email,
            password
        }
    });

}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        console.log("loggout successfully")
    })

}
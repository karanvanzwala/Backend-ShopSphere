

exports.postLogin = (req, res, next) => {

    // req.isLoggedIn = true
    const { email, password } = req.body;
    console.log("Login attempt:123", { email, password });
    // res.cookie("isLoggedIn", true)
    req.session.isLoggedIn = true

    // res.cookie("isLoggedIn", "true");
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
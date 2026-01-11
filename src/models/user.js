// Core Modules

const { getDB } = require("../utils/databaseUtil");

module.exports = class User {
    constructor(fullName,
        email,
        mobile,
        address,
        gender, id) {
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.gender = gender;
        this.id = id
    }

    save() {

        const db = getDB()
        return db.collection("users").insertOne(this)
        // if (this.id) {
        //     return db.execute('UPDATE users SET fullName=?,email=?,mobile=?,gender=?,address=? WHERE id=?', [this.fullName, this.email, this.mobile, this.gender, this.address, this.id])
        // } else {

        //     return db.execute('INSERT INTO users (fullName, email, mobile, gender, address) VALUES (?, ?, ?, ?, ?)', [this.fullName, this.email, this.mobile, this.gender, this.address]).then((res) => {
        //         console.log(res, "res")

        //     }).catch((error) => {
        //         console.log(error, ";;;;;")
        //     });
        // }
    }

    static fetchAll(callback) {
        // return db.execute('SELECT * FROM users');

    }
    static findById(userId) {
        // return db.execute('SELECT * FROM users WHERE id=?', [userId])

    }


    static deleteById(userId,) {
        // return db.execute('DELETE FROM users WHERE id=?', [userId]);

    }


};
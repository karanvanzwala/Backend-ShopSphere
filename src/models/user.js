// Core Modules
const db = require("../utils/databaseUtil")
module.exports = class User {
    constructor(fullName,
        email,
        mobile,
        address,
        gender) {
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.gender = gender;
    }

    save() {


    }

    static fetchAll(callback) {
        return db.execute('SELECT * FROM users');

    }
    static findById(userId, callback) {


    }


    static deleteById(userId, callback) {

    }


};
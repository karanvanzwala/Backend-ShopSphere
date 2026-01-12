
const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");

module.exports = class User {
    constructor(fullName,
        email,
        mobile,
        address,
        gender, _id) {
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.gender = gender;

        if (_id) {
            this._id = _id
        }
    }

    save() {
        const db = getDB()
        if (this._id) {
            const updateField = {
                fullName: this.fullName,
                email: this.email,
                mobile: this.mobile,
                address: this.address,
                gender: this.gender

            }
            return db.collection("users").updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateField })
        } else {
            return db.collection("users").insertOne(this)

        }

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
        const db = getDB()
        return db.collection("users").find().toArray()
        // return db.execute('SELECT * FROM users');

    }
    static findById(userId) {
        const db = getDB()
        return db.collection("users").find({ _id: new ObjectId(String(userId)) }).next()
        // return db.execute('SELECT * FROM users WHERE id=?', [userId])

    }


    static deleteById(userId,) {
        const db = getDB()
        return db.collection("users").deleteOne({ _id: new ObjectId(String(userId)) })
        // return db.execute('DELETE FROM users WHERE id=?', [userId]);

    }


};
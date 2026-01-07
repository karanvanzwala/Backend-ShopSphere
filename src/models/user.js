// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

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
        User.fetchAll((registeredUser) => {

            registeredUser.push(this);
            const userDataPath = path.join(rootDir, "/src/data", "user.json");

            fs.writeFile(userDataPath, JSON.stringify(registeredUser), (error) => {
                console.log("File Writing Concluded", error);
            });
            // fs.writeFile(userDataPath, JSON.stringify(registeredUser), (error) => {
            //     console.log("File Writing Concluded", error);
            // });

        });
    }

    static fetchAll(callback) {
        const userDataPath = path.join(rootDir, "/src/data", "user.json");
        fs.readFile(userDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        });
    }
};
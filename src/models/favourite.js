// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");


const favouriteDataPath = path.join(rootDir, "/src/data", "favourite.json");

module.exports = class Favourite {

    static addToFavourites(userID, callback) {

        Favourite.getFavourites((favourites) => {
            if (favourites.includes(userID)) {
                callback("user is already marked favourite");
            } else {
                favourites.push(userID)
                fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback)
            }
        })

    }

    static getFavourites(callback) {
        fs.readFile(favouriteDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        });
    }

    static deleteFavouriteById(userId, callback) {
        this.getFavourites(favourites => {
            const updatedFavourites = favourites.filter(favourite => favourite !== userId)
            fs.writeFile(favouriteDataPath, JSON.stringify(updatedFavourites), callback);
        });
    }
};
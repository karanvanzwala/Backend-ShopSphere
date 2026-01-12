// const { getDB } = require("../utils/databaseUtil");

const { getDB } = require("../utils/databaseUtil");


module.exports = class Favourite {

    constructor(userid) {
        this.userid = userid
    }

    save() {
        const db = getDB()
        return db.collection('favourites').insertOne(this)
    }

    static getFavourites() {
        const db = getDB();
        return db.collection('favourites').find().toArray();
    }

    static deleteFavouriteById(userId) {
        const db = getDB();
        return db.collection("favourites").deleteOne({ userid: userId })

    }
};
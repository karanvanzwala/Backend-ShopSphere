// const { getDB } = require("../utils/databaseUtil");

// module.exports = class Favourite {

//     constructor(userid) {
//         this.userid = userid
//     }

//     save() {
//         const db = getDB()
//         return db.collection('favourites').findOne({ userid: this.userid }).then((exist => {
//             if (!exist) {
//                 return db.collection('favourites').insertOne(this)
//             } else {
//                 return Promise.resolve()
//             }
//         }))

//     }

//     static getFavourites() {
//         const db = getDB();
//         return db.collection('favourites').find().toArray();
//     }

//     static deleteFavouriteById(userId) {
//         const db = getDB();
//         return db.collection("favourites").deleteOne({ userid: userId })

//     }
// };

const mongoose = require('mongoose')

const favouriteSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
        unique: true
    }
})

module.exports = mongoose.model("Favourite", favouriteSchema)
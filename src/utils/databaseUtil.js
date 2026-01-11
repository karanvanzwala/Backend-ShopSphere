// const mysql2 = require("mysql2");

// const pool = mysql2.createPool({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "airbnb",
// });

// module.exports = pool.promise();

const mongo = require("mongodb")

const MongoClient = mongo.MongoClient
const MONGO_URL = "mongodb+srv://root:root@iamunstoppable.byrwt8a.mongodb.net/?appName=iamunstoppable"

let _db


const mongoConnect = (callback) => {
    MongoClient.connect(MONGO_URL).then(client => {
        _db = client.db("airbnb")
        callback()
    }).catch(error => {

        console.log("error while connecting to mongo", error)
    })
}

const getDB = () => {
    if (!_db) {
        throw new Error("Mongo not connect")
    }
    return _db

}

exports.mongoConnect = mongoConnect
exports.getDB = getDB
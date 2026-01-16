const express = require("express");
const path = require('path');
const session = require("express-session")
const cors = require("cors");
const rootDir = require("./src/utils/pathUtil");
const MongoDBStore = require("connect-mongodb-session")(session)

const dbpath = 'mongodb+srv://root:root@iamunstoppable.byrwt8a.mongodb.net/airbnb?appName=iamunstoppable'

const multer = require("multer")


const store = new MongoDBStore({
    uri: dbpath,
    collection: "session"
})
const app = express();


// Configure CORS to allow requests from localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));




const adminRoutes = require("./src/routes/adminRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes")
// const { mongoConnect } = require("./src/utils/databaseUtil");
const { default: mongoose } = require("mongoose");

const randomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, randomString(10) + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const multerOptions = {
    storage, fileFilter
};

app.use(express.urlencoded({ extended: true }));

app.use(multer(multerOptions).single('photo'));
app.use(express.static(path.join(rootDir, 'public')))
app.use(express.json());

app.use(session({
    secret: "I Am Unstoppable",
    resave: false,
    saveUninitialized: true,
    store
}))

app.use((req, res, next) => {
    // req.isLoggedIn = req.session.isLoggedIn
    // req.user = req.session.user

    console.log(req.session, "{{}}")

    console.log("check cookie", req.get("Cookie"))
    next()

})

app.use(adminRoutes);
app.use(userRoutes);
app.use(authRoutes);





const PORT = 3001;
// mongoConnect(client => {
//     app.listen(PORT, () => {
//         console.log("Server is running on port 3001");
//     });
// })


mongoose.connect(dbpath).then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port 3001");
    });
}).catch((error) => {
    console.log("error while connect mongoose db...", error)
})

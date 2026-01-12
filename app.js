const express = require("express");
const cors = require("cors");

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
// const { mongoConnect } = require("./src/utils/databaseUtil");
const { default: mongoose } = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(adminRoutes);
app.use(userRoutes);


app.post("/admin/login", (req, res) => {
    console.log("Login detasssssils received");
    const { email, password } = req.body;
    // For demonstration, log the received credentials
    console.log("Login attempt:", { email, password });

    // You can replace the below with your own authentication logic
    // Respond back with the received data
    res.json({
        message: "Login details received",
        data: {
            email,
            password
        }
    });
});




const PORT = 3001;
// mongoConnect(client => {
//     app.listen(PORT, () => {
//         console.log("Server is running on port 3001");
//     });
// })


const dbpath = 'mongodb+srv://root:root@iamunstoppable.byrwt8a.mongodb.net/airbnb?appName=iamunstoppable'
mongoose.connect(dbpath).then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port 3001");
    });
}).catch((error) => {
    console.log("error while connect mongoose db...", error)
})

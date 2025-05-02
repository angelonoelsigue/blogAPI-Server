const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//Routes Middleware
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

// Environment Setup
require('dotenv').config();

const app = express();

// Connecting to MongoDB Atlas
mongoose.connect(process.env.MONGODB_STRING);

// If the connection is successful, output in the console
mongoose.connection.once("open", () => console.log("We're connected to the cloud database"));

// Allows your app to read json data
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:3000', 'https://blog-app-client-wheat.vercel.app/login'],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// Allows your app to read data from forms
app.use(express.urlencoded({extended:true}));

// Use the routes
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

if(require.main === module){
    app.listen(process.env.PORT || port, () => {
        console.log(`API is now online on port ${ process.env.PORT || port }`)
    });
}

module.exports = {app,mongoose};
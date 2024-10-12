const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const profileRoutes = require('./routes/profile');
const app = express();
const PORT = process.env.PORT || 5001;
const mongo_uri = "mongodb+srv://tic3901:2401NWRG1@tic3901.omjhh.mongodb.net/?retryWrites=true&w=majority&appName=TIC3901";

app.use(cors());
app.use(bodyParser.json());

// Sample data (in place of a database)
let profiles = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 }
];

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log('This is a middleware')
    next()
})

// routes
app.use('/profiles', profileRoutes)

// connect to mongodb
mongoose.connect(mongo_uri)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`Connected to DB and listening on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

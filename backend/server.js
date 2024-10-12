const express = require('express')
const mongoose = require('mongoose')
const profileRoutes = require('./routes/profile')
const app = express()
const port = 3000
const mongo_uri = "mongodb+srv://tic3901:2401NWRG1@tic3901.omjhh.mongodb.net/?retryWrites=true&w=majority&appName=TIC3901";

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
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

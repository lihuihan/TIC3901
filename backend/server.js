const express = require('express')
const profileRoutes = require('./routes/profile')
const app = express()
const port = 3000

// listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log('This is a middleware')
    next()
})

app.use('/profiles', profileRoutes)
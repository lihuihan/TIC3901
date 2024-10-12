const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({message: 'GET all users'})
})

router.get('/:id', (req, res) => {
    res.json({message: `GET profile of user ${req.params.id}`})
})

router.post('/', (req, res) => {
    res.json({message: 'POST new user'})
})

router.delete('/:id', (req, res) => {
    res.json({message: `DELETE user ${req.params.id}`})
})

router.put('/:id', (req, res) => {
    res.json({message: `UPDATE user ${req.params.id}`})
})

module.exports = router
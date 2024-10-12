const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Sample data (in place of a database)
let profiles = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 }
];

// Get all profiles
app.get('/api/profiles', (req, res) => {
    res.json(profiles);
});

// Get a single profile
app.get('/api/profiles/:id', (req, res) => {
    const profile = profiles.find(p => p.id === parseInt(req.params.id));
    if (!profile) return res.status(404).send('Profile not found');
    res.json(profile);
});

// Add a new profile
app.post('/api/profiles', (req, res) => {
    const newProfile = {
        id: profiles.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    profiles.push(newProfile);
    res.status(201).json(newProfile);
});

// Update a profile
app.put('/api/profiles/:id', (req, res) => {
    const profile = profiles.find(p => p.id === parseInt(req.params.id));
    if (!profile) return res.status(404).send('Profile not found');

    profile.name = req.body.name;
    profile.age = req.body.age;
    res.json(profile);
});

// Delete a profile
app.delete('/api/profiles/:id', (req, res) => {
    const profileIndex = profiles.findIndex(p => p.id === parseInt(req.params.id));
    if (profileIndex === -1) return res.status(404).send('Profile not found');

    const deletedProfile = profiles.splice(profileIndex, 1);
    res.json(deletedProfile);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

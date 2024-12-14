const express = require('express')
const router = express.Router()

// GET all profiles
router.get('/api/profiles', (req, res) => {
    res.json(profiles);
});

// GET single profile
router.get('/api/profiles/:id', (req, res) => {
    const profile = profiles.find(p => p.id === parseInt(req.params.id));
    if (!profile) return res.status(404).send('Profile not found');
    res.json(profile);
});

// CREATE new profile
router.post('/api/profiles', (req, res) => {
    const newProfile = {
        id: profiles.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    profiles.push(newProfile);
    res.status(201).json(newProfile);
});

// DELETE single profile
router.delete('/api/profiles/:id', (req, res) => {
    const profileIndex = profiles.findIndex(p => p.id === parseInt(req.params.id));
    if (profileIndex === -1) return res.status(404).send('Profile not found');

    const deletedProfile = profiles.splice(profileIndex, 1);
    res.json(deletedProfile);
});

// UPDATE single profile
router.put('/api/profiles/:id', (req, res) => {
    const profile = profiles.find(p => p.id === parseInt(req.params.id));
    if (!profile) return res.status(404).send('Profile not found');

    profile.name = req.body.name;
    profile.age = req.body.age;
    res.json(profile);
});

module.exports = router
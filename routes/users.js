const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // For generating a token


// POST endpoint to create a new user
router.post('/create', async (req, res) => {
    const { username, password } = req.body;

    console.log('[INCOMING REQUEST] Create User:', username);

    // Validate request body
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Create a new user and save to the database
        const user = new User({ username, password });
        await user.save();
        console.log('User successfully added to database', username);

        return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// POST endpoint for user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('[INCOMING REQUEST] User login:', username);

    // Validate request body
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // 404 Not Found
        }

        // Check if the password matches
        //const isMatch = await bcrypt.compare(password, user.password);
        console.log(password, user.password);
        if (passrowd==user.password) {
            return res.status(401).json({ message: 'Invalid password' }); // 401 Unauthorized
        }

        // Generate a token
        const token = crypto.createHash('sha256').update(`${username}${Date.now()}`).digest('hex');

        // Save the token to the database
        user.token = token;
        await user.save();

        return res.status(200).json({ token }); // 200 OK
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

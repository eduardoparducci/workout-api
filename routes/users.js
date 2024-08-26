const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST endpoint to create a new user
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' }); // 409 Conflict
    }

    // Create a new user and save to the database
    const user = new User({ username, password });
    await user.save();

    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

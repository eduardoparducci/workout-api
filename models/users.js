const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, default: null }
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;

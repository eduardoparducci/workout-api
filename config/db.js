const mongoose = require('mongoose');

// MongoDB Connection String
const mongoUri = 'mongodb+srv://parduccitreinos:Larissa%4011@workout-db.8rf8y.mongodb.net/wo?retryWrites=true&w=majority&appName=Workout-db';

// Connect to MongoDB
mongoose.connect(mongoUri, {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

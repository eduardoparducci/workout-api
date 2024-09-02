const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/users');
require('./config/db'); // Import and connect to MongoDB

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Use user routes
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

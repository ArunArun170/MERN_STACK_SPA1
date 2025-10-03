// server/server.js
require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Required to allow React to communicate with Express
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware Setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Built-in body-parser for parsing JSON request bodies

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route Middleware
// All routes start with /api/tasks as defined in the assignment
app.use('/api/tasks', taskRoutes);

// Simple base route for testing server
app.get('/', (req, res) => {
    res.send('To-Do List API is running.');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// server/server.js
require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- CORS Configuration FIX ---
// Whitelist the allowed domains (origins) that can access this API.
// 1. http://localhost:3000 (For testing locally)
// 2. https://mernstackspa.netlify.app (Your live frontend domain)
const allowedOrigins = [
    'http://localhost:3000', 
    'https://mernstackspa.netlify.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like postman or mobile apps)
        if (!origin) return callback(null, true); 
        
        if (allowedOrigins.indexOf(origin) === -1) {
            // The request's origin domain is not in the whitelist
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
};

// Middleware Setup - Now using the customized CORS options
app.use(cors(corsOptions)); 
app.use(express.json()); // Built-in body-parser for parsing JSON request bodies
// --- END CORS FIX ---

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

// server/server.js
require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const taskRoutes = require('./routes/taskRoutes');

const app = express();
// Render requires binding to process.env.PORT, and for binding to be universal
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // CRITICAL FIX: Bind to all network interfaces for deployment
const MONGO_URI = process.env.MONGO_URI;

// --- CORS Configuration (Your Netlify Domain) ---
const allowedOrigins = [
    'http://localhost:3000', 
    'https://mernstackspa.netlify.app' // YOUR LIVE NETLIFY DOMAIN
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); 
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
};

// Middleware Setup - Now using the customized CORS options
app.use(cors(corsOptions)); 
app.use(express.json()); 

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route Middleware
app.use('/api/tasks', taskRoutes);

// Simple base route for testing server
app.get('/', (req, res) => {
    res.send('To-Do List API is running.');
});

// START SERVER FIX: Include HOST address in app.listen
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});

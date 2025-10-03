// server/models/Task.js
const mongoose = require('mongoose');

// Mongoose Schema Definition (2.A. Data Model)
const TaskSchema = new mongoose.Schema({
    // title (String, Required): The text of the To-Do item.
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    // isCompleted (Boolean, Default: false): Tracks the completion status.
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    // Timestamps option automatically handles 'createdAt' and 'updatedAt'.
    // We only need 'createdAt' for sorting, which this provides.
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
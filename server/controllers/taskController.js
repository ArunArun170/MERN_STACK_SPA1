// server/controllers/taskController.js
const Task = require('../models/Task');

// 1. READ: Fetch all tasks, sorted by createdAt descending (newest first).
const getTasks = async (req, res) => {
    try {
        // Sort: -1 means descending (newest first).
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        // Basic error handling
        res.status(500).json({ message: error.message });
    }
};

// 2. CREATE: Add a new task with a title.
const createTask = async (req, res) => {
    // Expected Payload: { "title": "Task Text" }
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const newTask = new Task({ title });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3. UPDATE: Update status or title by ID.
const updateTask = async (req, res) => {
    // Expected Payload: { "isCompleted": true } or { "title": "New Title" }
    const { id } = req.params;
    const updates = req.body;

    // Check if any valid updates are provided
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'No fields to update provided' });
    }

    try {
        // Find by ID and update. { new: true } returns the updated document.
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 4. DELETE: Delete a task by ID.
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        // Return only the ID of the deleted task to update the frontend state efficiently
        res.status(200).json({ id: deletedTask._id, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
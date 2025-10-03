// server/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// 2.B. RESTful API Endpoints
// GET /api/tasks (Fetch all tasks, newest first)
router.get('/', getTasks);

// POST /api/tasks (Create a new task)
router.post('/', createTask);

// PUT /api/tasks/:id (Update status or title)
router.put('/:id', updateTask);

// DELETE /api/tasks/:id (Delete a specific task by ID)
router.delete('/:id', deleteTask);

module.exports = router;
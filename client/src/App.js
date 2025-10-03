// client/src/App.js
import React, { useState, useEffect, useMemo } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import './App.css'; 

const App = () => {
    // State management for tasks, new input, filtering, and errors
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [filter, setFilter] = useState('All'); // 'All', 'Active', 'Completed'
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');

    // B. User Workflow: Initial Load & Read Operation
    const fetchTasks = async () => {
        try {
            setError(null);
            const response = await getTasks();
            // Tasks are already sorted newest first by the backend
            setTasks(response.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            // Basic Error Handling
            setError('Failed to fetch tasks. Please ensure the backend server is running.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []); // Runs once on component mount

    // A. Core Functionality: Create Task
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            setError(null);
            const response = await createTask(newTaskTitle.trim());
            // Update React state instantly (new task at the top)
            setTasks([response.data, ...tasks]);
            setNewTaskTitle('');
        } catch (err) {
            setError('Failed to add task.');
        }
    };

    // A. Core Functionality: Update Status (Toggle)
    const handleToggleComplete = async (id, isCompleted) => {
        try {
            setError(null);
            // PUT request to update only the isCompleted field
            const response = await updateTask(id, { isCompleted: !isCompleted });
            
            // Update the local state for real-time UI update
            setTasks(tasks.map(task => 
                task._id === id ? response.data : task
            ));
        } catch (err) {
            setError('Failed to update task status.');
        }
    };

    // A. Core Functionality: Delete Task
    const handleDeleteTask = async (id) => {
        try {
            setError(null);
            await deleteTask(id); // DELETE request
            // Update local state by removing the deleted task
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            setError('Failed to delete task.');
        }
    };

    // B. User Workflow: Start Editing
    const startEdit = (task) => {
        setEditingId(task._id);
        setEditingTitle(task.title);
    };

    // A. Core Functionality: Save Edited Title
    const handleSaveEdit = async (id) => {
        if (!editingTitle.trim() || editingTitle === tasks.find(t => t._id === id)?.title) {
            setEditingId(null); // Exit editing if title is empty or unchanged
            return;
        }

        try {
            setError(null);
            // PUT request to update only the title field
            const response = await updateTask(id, { title: editingTitle.trim() });
            
            // Update local state
            setTasks(tasks.map(task => 
                task._id === id ? response.data : task
            ));

            setEditingId(null); // Exit editing mode
            setEditingTitle('');
        } catch (err) {
            setError('Failed to edit task title.');
        }
    };

    // A. Core Functionality: Filter (using React state filtering)
    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'Active':
                return tasks.filter(task => !task.isCompleted);
            case 'Completed':
                return tasks.filter(task => task.isCompleted);
            case 'All':
            default:
                return tasks;
        }
    }, [filter, tasks]); // Recalculates only when filter or tasks array changes

    const isFilterActive = (name) => (filter === name ? 'active-filter' : '');

    return (
        <div className="app-container">
            <header>
                <h1>Basic To-Do List</h1>
            </header>

            {/* Error Handling Display */}
            {error && <div className="error-message">{error}</div>}

            {/* Input Area */}
            <form className="add-task-form" onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button type="submit" className="add-task-btn">Add Task</button>
            </form>

            {/* Filter Bar */}
            <div className="filter-bar">
                <button 
                    className={isFilterActive('All')} 
                    onClick={() => setFilter('All')}
                >
                    All Tasks
                </button>
                <button 
                    className={isFilterActive('Active')} 
                    onClick={() => setFilter('Active')}
                >
                    Active Tasks
                </button>
                <button 
                    className={isFilterActive('Completed')} 
                    onClick={() => setFilter('Completed')}
                >
                    Completed Tasks
                </button>
            </div>

            {/* Task List */}
            <ul className="task-list">
                {filteredTasks.map(task => (
                    <li key={task._id} className={task.isCompleted ? 'completed-task' : ''}>
                        {/* Status Checkbox */}
                        <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => handleToggleComplete(task._id, task.isCompleted)}
                        />
                        
                        {editingId === task._id ? (
                            // Update (Edit Title): Input field for editing
                            <input
                                type="text"
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                // onBlur and Enter key trigger the save function
                                onBlur={() => handleSaveEdit(task._id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.target.blur(); 
                                    }
                                }}
                                autoFocus
                                className="edit-input"
                            />
                        ) : (
                            // Update (Edit Title): Double-click to start edit
                            <span 
                                onDoubleClick={() => startEdit(task)}
                                className="task-title"
                            >
                                {task.title}
                            </span>
                        )}
                        
                        {/* Delete Button */}
                        <button 
                            onClick={() => handleDeleteTask(task._id)} 
                            className="delete-btn"
                        >
                            🗑️
                        </button>
                    </li>
                ))}
                {filteredTasks.length === 0 && (
                    <li className="no-tasks">No tasks to display in this view.</li>
                )}
            </ul>
        </div>
    );
};

export default App;
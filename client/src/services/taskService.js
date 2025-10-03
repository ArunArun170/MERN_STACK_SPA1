// client/src/services/taskService.js
import axios from 'axios';

// IMPORTANT: This file reads the base URL from the environment variable set on Netlify.
// This URL should be defined without the trailing slash:
// e.g., REACT_APP_API_URL=https://mern-stack-spa1.onrender.com

// The missing slash is added here to correctly form the full endpoint path.
const API_URL = process.env.REACT_APP_API_URL + '/api/tasks';


// 2.B. GET /api/tasks (Read)
export const getTasks = async () => {
    // This fetches all tasks, which the backend sorts by createdAt descending.
    return axios.get(API_URL);
};

// 2.B. POST /api/tasks (Create)
export const createTask = async (title) => {
    // Payload: { "title": "Task Text" }
    return axios.post(API_URL, { title });
};

// 2.B. PUT /api/tasks/:id (Update Status or Title)
export const updateTask = async (id, data) => {
    // data is { isCompleted: true } OR { title: "New Title" }
    // The id must be appended correctly to the API base URL
    return axios.put(`${API_URL}/${id}`, data);
};

// 2.B. DELETE /api/tasks/:id (Delete)
export const deleteTask = async (id) => {
    // The id must be appended correctly to the API base URL
    return axios.delete(`${API_URL}/${id}`);
};

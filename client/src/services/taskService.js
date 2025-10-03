// client/src/services/taskService.js
import axios from 'axios';

// Base URL points to the Express backend (server/server.js)
//const API_URL = 'http://localhost:5000/api/tasks';
const API_URL = process.env.REACT_APP_API_URL + 'api/tasks';


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
    return axios.put(`${API_URL}/${id}`, data);
};

// 2.B. DELETE /api/tasks/:id (Delete)
export const deleteTask = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
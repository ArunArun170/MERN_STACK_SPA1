# MERN_STACK_SPA: Basic To-Do List Application

This is a complete, full-stack Single Page Application (SPA) built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It supports full CRUD (Create, Read, Update, Delete) functionality with client-side filtering and a clean UI/UX.

## 1. Project Stack

* **Frontend (Client):** React.js (created with `create-react-app`)
* **Backend (Server):** Node.js with Express.js
* **Database:** MongoDB (using Mongoose ODM)
* **API:** RESTful API served by Express on port 5000.

## 2. Setup and Installation

### Prerequisites

1.  **Node.js** (LTS recommended) and npm
2.  **MongoDB Server** (local or cloud-based) must be running.

### 2.1. Backend Setup (`server/`)

1.  Navigate to the server directory:
    ```bash
    cd MERN_STACK_SPA/server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Database Configuration (.env):**
    * Create a file named **`.env`** in the `server/` directory.
    * Set the port and your MongoDB connection URI (Mongoose will automatically create the database `todoDB` on first connection):
        ```
        PORT=5000
        MONGO_URI="mongodb://127.0.0.1:27017/todoDB"
        ```
4.  Start the server (Terminal 1):
    ```bash
    npm run dev
    ```

### 2.2. Frontend Setup (`client/`)

1.  Navigate to the client directory:
    ```bash
    cd MERN_STACK_SPA/client
    ```
2.  Install dependencies (if you haven't already after running `create-react-app`):
    ```bash
    npm install
    ```
3.  Start the client (Terminal 2):
    ```bash
    npm start
    ```

The application will launch in your browser (usually `http://localhost:3000`) and communicate with the backend on port 5000.

## 3. Core API Endpoints

The Express server exposes the following RESTful endpoints under the base path `/api/tasks`:

| Method | Endpoint | Description | Expected Payload |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/` | Fetches all tasks, sorted by `createdAt` descending. | None |
| **`POST`** | `/` | Creates a new task. | `{ "title": "New task text" }` |
| **`PUT`** | `/:id` | Updates task status or title by ID. | `{ "isCompleted": true }` or `{ "title": "New Title" }` |
| **`DELETE`** | `/:id` | Deletes a task by ID. | None |
# Task Management Backend

This is the backend part of the Task Management web application built with Node.js (Express) and MongoDB.

## Features
- RESTful API for task management: 
    - Create, Read, Update, and Delete tasks.
- Uses MongoDB for data storage.
- Implements CORS for communication with the frontend.

## Tech Stack
- Node.js
- Express.js
- MongoDB

## API Endpoints
- The backend API is structured with the following endpoints:
- GET /tasks - Retrieve all tasks
- POST /tasks - Create a new task
- GET /tasks/:id - Retrieve a specific task by ID
- PUT /tasks/:id - Update a specific task
- DELETE /tasks/:id - Delete a task by ID

---

## Getting Started

### Prerequisites
- Node.js and npm

---

### Installation

1. Clone the repository:
   - git clone https://github.com/GowthamAkula89/task-management.git
2. Navigate to the project directory:
    #### Backend
    - cd server
3. Install dependencies:
    - npm install
    
### Running the Application
- Start the development server:
    - npm start
    - Open http://localhost:8081


### Live web URL
- Backend: https://task-management-50ng.onrender.com/api/

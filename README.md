# Full-Stack ToDo App

A simple full-stack ToDo application that allows users to create, edit, delete, and view tasks. Built with **Node.js**, **Express**, **MongoDB**, and a frontend using **HTML, CSS, and JavaScript**.


## Project Structure

Project1TODO/
├── frontend/ # Frontend files (HTML, CSS, JS)
├── models/ # MongoDB models
├── index.js # Backend server entry point
├── .env # Environment variables (not included in repo)
├── .gitignore
└── package.json


## Features
- Add, edit, delete, and view tasks
- Persistent storage with MongoDB
- Backend APIs with Node.js and Express



## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (runs on port 3000)
- **Backend:** Node.js, Express (runs on port 5000)
- **Database:** MongoDB, Mongoose
- **Other:** dotenv, CORS

---

## Setup Instructions

1. Clone the repository
git clone https://github.com/priyad16/TODOFS.git
cd Project1TODO

2. Install dependencies
npm install

3. Configure environment variables
Create a .env file in the root directory and add:
MONGO_URI=<your MongoDB connection string>

4. Run the backend server
npm run dev
The backend server will start on http://localhost:5000.

Note: Make sure you have CORS enabled in your backend to allow requests from the frontend:
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

5. Open the frontend
Open frontend/index.html in your browser, or if using a development server, run it on port 3000.

Notes:
The .env file is not included in the repository for security reasons.
Make sure MongoDB is running and the MONGO_URI is correctly set.
Frontend (port 3000) communicates with backend (port 5000) via APIs.
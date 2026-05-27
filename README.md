# Task Manager App

A full-stack Task Management Web Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
The application allows users to register, log in, and manage their daily tasks with authentication and protected routes.

---

# Features

## Authentication

* User Signup
* User Login
* JWT Authentication
* Protected Routes
* Logout Functionality

## Task Management

* Create Task
* Update Task
* Delete Task
* Mark Task as Completed/Pending
* Filter Tasks

  * All
  * Completed
  * Pending

## UI Features

* Responsive Dashboard
* Modern Task Cards
* Toast Notifications
* Loading Spinner
* Empty State UI

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Toastify
* Context API

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* dotenv

## Database

* MongoDB Atlas
* Mongoose

## Deployment

* Frontend: Vercel
* Backend: Render

---

# Project Structure

## Backend Structure

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
```

---

## Frontend Structure

```text
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
```

---

# Setup Instructions

# Backend Setup

## Step 1 — Clone Repository

```bash
git clone YOUR_BACKEND_REPO_LINK
```

## Step 2 — Install Dependencies

```bash
npm install
```

## Step 3 — Create `.env`

Create `.env` file in backend root:

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

## Step 4 — Start Backend Server

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

## Step 1 — Clone Repository

```bash
git clone YOUR_FRONTEND_REPO_LINK
```

## Step 2 — Install Dependencies

```bash
npm install
```

## Step 3 — Create `.env`

Create `.env` file in frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 4 — Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Endpoints

# Authentication APIs

## Register User

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

---

## Login User

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

# Task APIs

## Get All Tasks

```http
GET /api/tasks
```

Authorization Required:

```text
Bearer Token
```

---

## Create Task

```http
POST /api/tasks
```

### Request Body

```json
{
  "title": "Learn MERN",
  "description": "Complete backend APIs"
}
```

---

## Update Task

```http
PUT /api/tasks/:id
```

---

## Delete Task

```http
DELETE /api/tasks/:id
```

---

# Environment Variables

## Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

## Frontend

```env
VITE_API_URL=
```

---

# Deployment Links

## Frontend

```text
Add your Vercel deployment link here
```

## Backend

```text
Add your Render deployment link here
```

---

# Assumptions Made

* Users can only access their own tasks
* JWT token is stored in localStorage
* MongoDB Atlas is used as cloud database
* Backend APIs are protected using JWT middleware
* Frontend communicates with backend using Axios
* Tailwind CSS is used for responsive design

---

# Future Improvements

* Dark Mode
* Search Functionality
* Pagination
* Due Dates
* Drag & Drop Tasks
* Role-Based Access
* Unit Testing
* Docker Support
* Swagger API Documentation

---

# Author

Jigyasha Rani

---

# License

This project is created for assignment and learning purposes.

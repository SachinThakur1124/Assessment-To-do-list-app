# Assessment To-Do List App (MERN Stack)

A full-stack MERN (MongoDB, Express, React, Node.js) task management application crafted according to the Figma mobile design specification, featuring end-to-end task CRUD, weekly progress tracking, dedicated real-time search, full priority labels, onboarding, and Dark Mode.

---

## 🚀 Quick Start (Simple Steps)

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on port `27017` (or a MongoDB Atlas connection string)
- [Git](https://git-scm.com/)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/SachinThakur1124/Assessment-To-do-list-app.git
cd Assessment-To-do-list-app
```

---

### Step 2: Backend Setup & Run
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` folder (or use existing defaults):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/taskmanager
   CLIENT_ORIGIN=http://localhost:5173
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   > The server will connect to MongoDB and listen on `http://localhost:5000`.

---

### Step 3: Frontend Setup & Run
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the browser at the URL shown in the terminal (typically `http://localhost:5173` or `http://localhost:5174`).

---

## ✨ Features

- **Figma Mobile Design**: Pixel-accurate implementation following the Figma mobile specification, fully responsive across mobile, tablet, and desktop screens.
- **Full CRUD Management**: Create, view, edit, and delete tasks with instant optimistic updates and persistent MongoDB storage.
- **Weekly Date Selector & Progress**:
  - Horizontal week date picker showing day abbreviations and dates.
  - Dynamic **Weekly Progress** bar calculated from tasks in the currently selected week.
  - Task completion counters (Completed vs Pending this week).
- **Dedicated Search Screen**: Fast search screen filtering tasks across title and description in real time.
- **Priority System**: Support for `High`, `Medium`, and `Low` priority selection with color-coded, full-text badges.
- **Dark Mode**:
  - Visible theme toggle button in the top action bar (Moon ↔ Sun icon).
  - Class-based Tailwind v4 configuration (`@custom-variant dark`).
  - Persistent user preference in `localStorage` with automatic system fallback.
- **Onboarding Screen**: Clean first-visit onboarding illustration with a "Get Started" call-to-action.

---

## 🛠️ Tech Stack

- **Frontend**:
  - React 19
  - Vite
  - Tailwind CSS v4
  - Custom SVG Icons
- **Backend**:
  - Node.js & Express 5
  - MongoDB & Mongoose
  - CORS & dotenv
- **Database**:
  - MongoDB

---

## 📡 REST API Reference

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Fetch all tasks (supports `?weekKey=YYYY-Www` & `?date=YYYY-MM-DD`) |
| `GET` | `/api/tasks/:id` | Fetch single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `PATCH` | `/api/tasks/:id/status` | Toggle task completion status (`completed` / `in-progress`) |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Task Schema Sample
```json
{
  "title": "Design Mobile App UI",
  "description": "Figma screens for task manager",
  "dateTime": "2026-11-13T09:00:00.000Z",
  "startTime": "09:00",
  "endTime": "10:30",
  "status": "in-progress",
  "priority": "High"
}
```

---

## 📦 Production Build

To build the frontend for production:
```bash
cd client
npm run build
```
The optimized production bundle will be output to `client/dist`.

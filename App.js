import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import api from "./api"; // Import the Axios instance
import TaskManager from "./components/TaskManager";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header"; // Import the Header component
import SignUpPage from "./components/SignUpPage"; // Import the Sign-Up Page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user information
  const [tasks, setTasks] = useState([]); // Task data fetched from API

  // Handle user login
  const handleLogin = async (credentials) => {
    try {
      const response = await api.post("/login", credentials); // API call for login
      const { access_token, email } = response.data;

      localStorage.setItem("authToken", access_token); // Save auth token
      setIsLoggedIn(true);
      setUser({ email }); // Save user data
      console.log("Login successful:", email);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear auth token
    setIsLoggedIn(false);
    setUser(null);
    setTasks([]); // Reset tasks on logout
  };

  // Fetch tasks on login
  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks"); // API call to fetch tasks
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error.message);
    }
  };

  return (
    <Router>
      <div>
        {/* Render the Header component only if the user is logged in */}
        {isLoggedIn && <Header onLogout={handleLogout} />}
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              !isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />
            }
          />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard tasks={tasks} fetchTasks={fetchTasks} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/tasks"
            element={
              isLoggedIn ? <TaskManager tasks={tasks} setTasks={setTasks} /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

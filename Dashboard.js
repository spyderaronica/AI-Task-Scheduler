import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // Axios instance

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // State for filtered tasks
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/users?page=2"); // Mock API endpoint
        const fetchedTasks = response.data.data.map((user) => ({
          title: `Task for ${user.first_name} ${user.last_name}`,
          completed: Math.random() > 0.5,
        }));
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks); // Initialize filteredTasks with all tasks
        setLoading(false);
      } catch (err) {
        setError("Failed to load tasks. Please try again later.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(term)
    );
    setFilteredTasks(filtered); // Update filtered tasks based on search term
  };

  if (loading) {
    return <p style={{ padding: "2rem", textAlign: "center" }}>Loading tasks...</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem", textAlign: "center", color: "red" }}>{error}</p>;
  }

  const completedTasks = filteredTasks.filter((task) => task.completed).length;
  const pendingTasks = filteredTasks.length - completedTasks;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Dashboard</h1>

      {/* Search Task */}
      <div
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Task Overview */}
      <div
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Task Overview</h2>
        <p>Total Tasks: {filteredTasks.length}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Pending Tasks: {pendingTasks}</p>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Quick Actions</h2>
        <Link
          to="/tasks"
          style={{
            display: "inline-block",
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            textDecoration: "none",
            color: "white",
            backgroundColor: "#007bff",
            borderRadius: "4px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          View All Tasks
        </Link>
        <Link
          to="/add-task"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            textDecoration: "none",
            color: "white",
            backgroundColor: "#28a745",
            borderRadius: "4px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e7e34")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Add New Task
        </Link>
      </div>

      {/* Recent Tasks */}
      <div
        style={{
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Recent Tasks</h2>
        <ul style={{ padding: 0, listStyleType: "none" }}>
          {filteredTasks.slice(0, 5).map((task, index) => (
            <li
              key={index}
              style={{
                marginBottom: "0.5rem",
                padding: "0.5rem",
                borderRadius: "4px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {task.title} -{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: task.completed ? "green" : "red",
                }}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

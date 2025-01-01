import React, { useState, useEffect } from "react";
import api from "../api"; // Import the Axios instance

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [suggestedDueDate, setSuggestedDueDate] = useState(""); // AI-Suggested Due Date

  // Fetch tasks from the API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setNotification("");

      try {
        const response = await api.get("/tasks");
        setTasks(response.data.tasks || []);
        setNotification("Tasks fetched successfully!");
      } catch (error) {
        setNotification("Failed to fetch tasks.");
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Fetch AI-Suggested Due Date
  const fetchSuggestedDueDate = async (description) => {
    try {
      const response = await api.post("/tasks/suggest-due-date", { description });
      setSuggestedDueDate(response.data.due_date); // Save suggested date in state
      setNotification(`AI suggested due date: ${response.data.due_date}`);
    } catch (error) {
      setNotification("Failed to fetch AI-suggested due date.");
      console.error("Error fetching AI-suggested due date:", error.message);
    }
  };

  // Add a new task via API with AI-suggested due date
  const addTaskWithAIScheduling = async () => {
    if (!newTask.trim()) {
      setNotification("Task title cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/tasks", {
        title: newTask,
        completed: false,
        priority: newPriority,
        due_date: suggestedDueDate || null, // Use AI-suggested date or null
      });
      setTasks([...tasks, response.data.task]);
      setNewTask("");
      setNewPriority("Medium");
      setSuggestedDueDate(""); // Clear suggested date after task creation
      setNotification("Task added with AI-suggested scheduling!");
    } catch (error) {
      setNotification("Failed to add task with AI scheduling.");
      console.error("Error adding task:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Priority Sorting Logic
  const getPriorityOrder = (priority) => {
    const priorityMap = { High: 1, Medium: 2, Low: 3 };
    return priorityMap[priority] || 4; // Default to lowest priority
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => getPriorityOrder(a.priority) - getPriorityOrder(b.priority));

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Task Manager</h2>

      {/* Notifications */}
      {notification && (
        <p
          style={{
            textAlign: "center",
            color: notification.includes("Failed") ? "red" : "green",
            marginBottom: "1rem",
          }}
        >
          {notification}
        </p>
      )}

      {/* Add Task */}
      <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={newTask}
          placeholder="Enter a new task"
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            fontSize: "1rem",
            marginRight: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            marginRight: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          onClick={() => fetchSuggestedDueDate(newTask)}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Fetching AI..." : "Get AI Due Date"}
        </button>
        <button
          onClick={addTaskWithAIScheduling}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "0.5rem",
          }}
          disabled={loading || !suggestedDueDate}
        >
          {loading ? "Adding..." : "Add with AI Scheduling"}
        </button>
      </div>

      {/* Search Task */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={searchQuery}
          placeholder="Search tasks..."
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        />
      </div>

      {/* Task List */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              padding: "0.5rem",
              marginBottom: "0.5rem",
              backgroundColor: "#f9f9f9",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  fontWeight: "bold",
                  marginRight: "0.5rem",
                  color:
                    task.priority === "High"
                      ? "red"
                      : task.priority === "Medium"
                      ? "orange"
                      : "green",
                }}
              >
                {task.priority}
              </span>
              <span>{task.title}</span>
              {task.due_date && (
                <span style={{ marginLeft: "0.5rem", color: "gray" }}>
                  (Due: {new Date(task.due_date).toLocaleDateString()})
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      {filteredTasks.length === 0 && !loading && <p style={{ textAlign: "center" }}>No tasks available.</p>}
    </div>
  );
};

export default TaskManager;







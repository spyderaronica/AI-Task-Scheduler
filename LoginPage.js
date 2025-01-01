import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Import the Axios instance
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for API request
  const [notification, setNotification] = useState(""); // Success notification
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotification("");
    setLoading(true);

    try {
      // Call the backend login API
      const response = await api.post("/login", { email, password });

      // Extract token and user information from response
      const { access_token, email: userEmail } = response.data;

      // Save the token to localStorage
      localStorage.setItem("authToken", access_token);

      // Display success notification
      setNotification("Login successful!");

      // Trigger onLogin to update app state with user email
      onLogin({ email: userEmail });

      // Redirect to dashboard
      navigate("/dashboard");

      console.log("Login successful:", access_token);
    } catch (err) {
      // Handle errors
      const errorMessage =
        err.response?.data?.detail || err.response?.data?.message || "Invalid email or password.";
      setError(errorMessage);
      console.error("Login error:", errorMessage);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="login-left">
        <img src="/logo.jpg" alt="App Logo" className="login-logo" />
        <h1 className="login-title">
          <span className="ai-text">AI</span> <span className="task-text">Task</span>{" "}
          <span className="scheduler-text">Scheduler</span>
        </h1>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <h2 className="login-heading">Login</h2>
        {error && <p className="login-error">{error}</p>}
        {notification && <p className="login-notification">{notification}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            <span className="form-icon">📧</span>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="login-input"
              required
            />
          </label>
          <label className="login-label">
            <span className="form-icon">🔒</span>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="login-input"
              required
            />
          </label>
          <button
            type="submit"
            className="login-button"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;




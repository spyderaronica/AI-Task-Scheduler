import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Base URL for the backend API

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Adds Authorization header if token exists)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to request headers
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error.message);
    return Promise.reject(error); // Handle request error
  }
);

// Response Interceptor (Handles global error handling)
api.interceptors.response.use(
  (response) => response, // Simply return the response if no errors
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized: Redirecting to login...");
      localStorage.removeItem("authToken"); // Remove token if unauthorized
      window.location.href = "/"; // Redirect to login page
    } else if (status >= 500) {
      console.error(
        "Server Error:",
        error.response?.data?.message || "An unexpected error occurred."
      );
    } else {
      console.warn(
        "API Error:",
        error.response?.data?.message || error.message
      );
    }

    return Promise.reject(error); // Reject the promise to handle errors in individual API calls
  }
);

export default api;

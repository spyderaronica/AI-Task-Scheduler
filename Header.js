// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onLogout }) => {
  return (
    <header style={{ padding: "1rem", backgroundColor: "#007bff", color: "white" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Link to="/dashboard" style={{ marginRight: "1rem", color: "white", textDecoration: "none" }}>
            Dashboard
          </Link>
          <Link to="/tasks" style={{ color: "white", textDecoration: "none" }}>
            Task Manager
          </Link>
        </div>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: "white",
            color: "#007bff",
            border: "none",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;


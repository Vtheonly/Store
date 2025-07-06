// src/admin/pages/AdminLoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../api/supabaseClient";
import "./AdminLoginPage.css"; // Styles for the login page

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // On successful login, Supabase client handles the session.
      // Navigate to the admin dashboard.
      navigate("/admin");
    } catch (error) {
      setError(error.message || "Failed to log in. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="search-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g., daniadmin@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="search-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="e.g., daniroot"
            />
          </div>

          {error && <p className="login-error-message">{error}</p>}

          <button
            type="submit"
            className="btn btn-reel"
            disabled={isLoading}
            style={{ width: "100%", marginTop: "1rem" }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
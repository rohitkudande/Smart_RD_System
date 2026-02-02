import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import heroBg from "./assets/img1.jpg";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        alert("Invalid Admin Credentials");
        return;
      }

      const data = await res.json();
      localStorage.setItem("admin", JSON.stringify(data));
      navigate("/admin/dashboard");

    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative"
      }}
    >
      {/* White transparent overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)"
        }}
      ></div>

      {/* Login Card */}
      <div className="container position-relative d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card shadow-lg p-4"
          style={{ width: "420px", borderRadius: "15px" }}
        >
          <h3 className="text-center mb-4 text-primary fw-bold">
            Admin Login
          </h3>

          <form onSubmit={login}>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <button
              className="btn btn-link p-0"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

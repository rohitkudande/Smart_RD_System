import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import heroBg from "./assets/img1.jpg";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    acno: "",
    mobile: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.acno || !loginData.mobile) {
      alert("Please enter Account Number and Mobile Number");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      if (!res.ok) {
        alert("Invalid Account Number or Mobile Number");
        return;
      }

      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dash");

    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
      <div
        className="card shadow-lg p-4 position-relative"
        style={{
          width: "420px",
          borderRadius: "15px",
          zIndex: 1
        }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">
          RD User Login
        </h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Account Number
            </label>
            <input
              type="text"
              className="form-control"
              name="acno"
              placeholder="Enter account number"
              value={loginData.acno}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Mobile Number
            </label>
            <input
              type="tel"
              className="form-control"
              name="mobile"
              placeholder="Enter mobile number"
              value={loginData.mobile}
              onChange={handleChange}
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
          <span className="text-muted">New User?</span>{" "}
          <button
            className="btn btn-link p-0 fw-semibold"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

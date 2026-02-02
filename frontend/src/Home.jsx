import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroBg from "./assets/img1.jpg";



export default function Home() {
    const navigate = useNavigate();
    const [contact, setContact] = useState({
      name: "",
      email: "",
      message: ""
    });

    const submitContact = async (e) => {
  e.preventDefault();

  if (!contact.name || !contact.email || !contact.message) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await fetch("http://localhost:8080/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });

    if (res.ok) {
      alert("Thank You...!");
      setContact({ name: "", email: "", message: "" });
    } else {
      alert("Failed to send message");
    }
  } catch (err) {
    alert("Server error");
  }
};


  return (
    <>
      <div
  className="py-5 text-center"
  style={{
    backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "70vh",
    position: "relative"
  }}
>
  {/* White transparent overlay */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.75)"
    }}
  ></div>

  {/* Content */}
  <div
    className="container position-relative d-flex flex-column justify-content-center align-items-center"
    style={{ minHeight: "70vh" }}
  >
    <h1 className="fw-bold mb-3">
      Welcome to Smart RD System
    </h1>

    <p className="text-muted mb-4 fs-5">
      A simple and secure way to manage Recurring Deposits,
      passbooks, and customer records digitally.
    </p>

    <div>
      <button
        className="btn btn-primary btn-lg me-2"
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>

      <button
        className="btn btn-outline-secondary btn-lg"
        onClick={() => navigate("/demo")}
      >
        Learn More
      </button>
    </div>
  </div>
</div>



      <div className="container py-5">
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">RD Management</h5>
                <p className="card-text">
                  Easily create and manage recurring deposit accounts.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Digital Passbook</h5>
                <p className="card-text">
                  Track monthly installments and balances digitally.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Secure System</h5>
                <p className="card-text">
                  Safe, reliable, and user-friendly platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="about" className="bg-secondary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">About Us</h2>
          <p>
            Smart RD System is designed to simplify RD account handling for institutions and customers with accuracy and security.
            It enables digital management of deposits, passbooks, and customer records, reducing manual work and errors.
            Our goal is to provide a reliable, transparent, and user-friendly platform for efficient financial operations.
          </p>
        </div>
      </div>

      <div id="contact" className="container py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Contact Us</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={submitContact}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })}/>

              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="3" value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })}/>
              </div>

              <button className="btn btn-primary w-100" type="submit">Send Message</button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

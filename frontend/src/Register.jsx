import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import heroBg from "./assets/img1.jpg";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    acno: "",
    rdamt: "",
    name: "",
    gender: "",
    dob: "",
    occupation: "",
    panno: "",
    adharno: "",
    mobile: "",
    addr: "",
    nname: "",
    nadharno: "",
    npanno: "",
    naddr: "",
    rddate: "",
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please accept terms & conditions");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert("Registration Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        minHeight: "100vh"
      }}
    >
      {/* White overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.8)"
        }}
      ></div>

      {/* Registration Card */}
      <div className="container position-relative">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white fw-bold text-center fs-5">
            RD User Registration
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>

              {/* Account Details */}
              <h6 className="mb-3 text-primary">Account Details</h6>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Account Number</label>
                  <input type="text" name="acno" className="form-control"
                    onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                  <label className="form-label">RD Amount</label>
                  <input type="number" name="rdamt" className="form-control"
                    onChange={handleChange} required />
                </div>
              </div>

              {/* Personal Details */}
              <h6 className="mb-3 text-primary">Personal Details</h6>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" className="form-control"
                    onChange={handleChange} required />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Gender</label>
                  <select name="gender" className="form-select"
                    onChange={handleChange} required>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Date of Birth</label>
                  <input type="date" name="dob" className="form-control"
                    onChange={handleChange} required />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Occupation</label>
                  <input type="text" name="occupation" className="form-control"
                    onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">PAN Number</label>
                  <input type="text" name="panno" className="form-control"
                    onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Aadhaar Number</label>
                  <input type="text" name="adharno" className="form-control"
                    onChange={handleChange} />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Mobile Number</label>
                  <input type="text" name="mobile" className="form-control"
                    onChange={handleChange} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea name="addr" className="form-control" rows="2"
                  onChange={handleChange}></textarea>
              </div>

              {/* Nominee Details */}
              <h6 className="mb-3 text-primary">Nominee Details</h6>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Nominee Name</label>
                  <input type="text" name="nname" className="form-control"
                    onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Nominee Aadhaar</label>
                  <input type="text" name="nadharno" className="form-control"
                    onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Nominee PAN</label>
                  <input type="text" name="npanno" className="form-control"
                    onChange={handleChange} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Nominee Address</label>
                <textarea name="naddr" className="form-control" rows="2"
                  onChange={handleChange}></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">RD Start Date</label>
                <input type="date" name="rddate" className="form-control"
                  onChange={handleChange} required />
              </div>

              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox"
                  name="agree" onChange={handleChange} />
                <label className="form-check-label">
                  I agree to the terms and conditions
                </label>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Register RD Account
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

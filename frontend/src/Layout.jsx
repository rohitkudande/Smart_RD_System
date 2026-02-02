import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <span
            className="navbar-brand fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Smart RD System
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <span className="nav-link" onClick={() => navigate("/")}>
                  Home
                </span>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact Us</a>
              </li>
            </ul>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/login")}>User Login</button>
              <button className="btn btn-warning btn-sm" onClick={() => navigate("/register")}>Register</button>
              <button className="btn btn-outline-dark btn-sm" onClick={() => navigate("/admin/login")}>Admin</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== PAGE CONTENT ===== */}
      <Outlet />

      {/* ===== FOOTER ===== */}
      <footer className="bg-dark text-white text-center py-3">
        <small>© 2026 Smart RD System | All Rights Reserved</small>
      </footer>
    </>
  );
}

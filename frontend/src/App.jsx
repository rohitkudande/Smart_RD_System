import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Demo from "./Demo";

import AdminLogin from "./AdminLogin";
import DashboardAdmin from "./DashboardAdmin";
import AdminRoute from "./AdminRoute";

import Layout from "./Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== PUBLIC PAGES WITH HEADER & FOOTER ===== */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ===== USER DASHBOARD (NO HEADER / FOOTER) ===== */}
        <Route path="/dash" element={<Dashboard />} />

        {/* ===== ADMIN ===== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardAdmin />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

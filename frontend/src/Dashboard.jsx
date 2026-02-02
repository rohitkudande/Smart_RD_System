import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [passbook, setPassbook] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8080/passbookById/${user.rid}`)
        .then(res => res.json())
        .then(data => setPassbook(data))
        .catch(err => console.error(err));
    }
  }, []);

 
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Welcome, <span className="text-primary">{user?.name}</span></h4>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <p><b>Account No:</b> {user?.acno}</p>
          <p><b>Mobile:</b> {user?.mobile}</p>
        </div>
      </div>

      <h5 className="mb-3">RD Passbook</h5>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Sr No</th>
            <th>RD Date</th>
            <th>RD Amount</th>
            <th>Late Days</th>
            <th>Fine Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {passbook.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No Transactions Found
              </td>
            </tr>
          ) : (
            passbook.map((p, index) => (
              <tr key={p.pid}>
                <td>{index + 1}</td>
                <td>{p.rddate}</td>
                <td>₹ {p.rdamt}</td>
                <td>{p.lday}</td>
                <td>₹ {p.famt}</td>
                <td>
                  {p.flag === 1
                    ? <span className="badge bg-success">Paid</span>
                    : <span className="badge bg-danger">Unpaid</span>
                  }
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}

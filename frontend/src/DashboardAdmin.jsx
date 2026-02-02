import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminDash() {

  const [view, setView] = useState("users");
  const [rdUsers, setRdUsers] = useState([]);
  const [passbook, setPassbook] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [rid, setRid] = useState("");
  const [editUser, setEditUser] = useState(null);

  // 🔹 NEW: passbook form state
  const [pb, setPb] = useState({
    rid: "",
    rddate: "",
    rdamt: "",
    lday: "",
    famt: "",
    flag: 1
  });

  // ================= USERS =================
  const loadUsers = () => {
    fetch("http://localhost:8080/rduser")
      .then(res => res.json())
      .then(data => setRdUsers(data));
  };

  useEffect(() => {
    if (view === "users") loadUsers();
  }, [view]);

  // ================= TOTAL =================
  useEffect(() => {
    if (view === "total") {
      fetch("http://localhost:8080/ttlamt")
        .then(res => res.json())
        .then(data => setTotalAmt(data.total || 0))
        .catch(() => setTotalAmt(0));
    }
  }, [view]);

  // ================= PASSBOOK VIEW =================
  const loadPassbook = () => {
    fetch(`http://localhost:8080/passbookById/${rid}`)
      .then(res => res.json())
      .then(data => setPassbook(data));
  };

  // ================= ADD PASSBOOK ENTRY =================
  const addPassbookEntry = () => {
    fetch("http://localhost:8080/psave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pb)
    })
      .then(res => res.json())
      .then(() => {
        alert("Passbook Entry Added Successfully");
        setPb({
          rid: "",
          rddate: "",
          rdamt: "",
          lday: "",
          famt: "",
          flag: 1
        });
      });
  };

  // ================= DELETE USER =================
  const deleteUser = (id) => {
    if (window.confirm("Delete this RD account?")) {
      fetch(`http://localhost:8080/delt/${id}`, { method: "DELETE" })
        .then(() => loadUsers());
    }
  };

  // ================= UPDATE USER =================
  const updateUser = () => {
    fetch("http://localhost:8080/updt", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUser)
    })
      .then(() => {
        alert("RD User Updated");
        setEditUser(null);
        loadUsers();
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* SIDEBAR */}
        <div className="col-md-3 bg-primary text-white min-vh-100 p-3">
          <h4 className="text-center mb-4">Admin Dashboard</h4>

          <button className="btn btn-light w-100 mb-2" onClick={() => setView("users")}>
            View RD Users
          </button>

          <button className="btn btn-light w-100 mb-2" onClick={() => setView("passbook")}>
            View Passbook
          </button>

          <button className="btn btn-light w-100 mb-2" onClick={() => setView("addpb")}>
            Add Passbook Entry
          </button>

          <button className="btn btn-light w-100 mb-2" onClick={() => setView("total")}>
            Total RD Amount
          </button>

          <button
            className="btn btn-danger w-100"
            onClick={() => {
              localStorage.removeItem("admin");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

        {/* MAIN */}
        <div className="col-md-9 p-4">

          {/* ================= USERS ================= */}
          {view === "users" && (
            <>
              <h4>All RD Users</h4>
              <table className="table table-bordered mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>RID</th>
                    <th>Name</th>
                    <th>Account</th>
                    <th>Mobile</th>
                    <th>RD Amt</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rdUsers.map(u => (
                    <tr key={u.rid}>
                      <td>{u.rid}</td>
                      <td>{u.name}</td>
                      <td>{u.acno}</td>
                      <td>{u.mobile}</td>
                      <td>₹ {u.rdamt}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2"
                          onClick={() => setEditUser(u)}>Edit</button>
                        <button className="btn btn-danger btn-sm"
                          onClick={() => deleteUser(u.rid)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {editUser && (
                <div className="card mt-3">
                  <div className="card-body">
                    <input className="form-control mb-2"
                      value={editUser.name}
                      onChange={e => setEditUser({ ...editUser, name: e.target.value })} />
                    <input className="form-control mb-2"
                      value={editUser.mobno}
                      onChange={e => setEditUser({ ...editUser, mobno: e.target.value })} />
                    <input type="number" className="form-control mb-2"
                      value={editUser.rdamt}
                      onChange={e => setEditUser({ ...editUser, rdamt: e.target.value })} />
                    <button className="btn btn-success me-2" onClick={updateUser}>Update</button>
                    <button className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================= VIEW PASSBOOK ================= */}
          {view === "passbook" && (
            <>
              <h4>RD Passbook</h4>
              <div className="d-flex mb-3">
                <input className="form-control w-25 me-2"
                  placeholder="Enter RID"
                  value={rid}
                  onChange={e => setRid(e.target.value)} />
                <button className="btn btn-primary" onClick={loadPassbook}>View</button>
              </div>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>RD Amt</th>
                    <th>Late Days</th>
                    <th>Fine</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {passbook.map(p => (
                    <tr key={p.pid}>
                      <td>{p.rddate}</td>
                      <td>₹ {p.rdamt}</td>
                      <td>{p.lday}</td>
                      <td>₹ {p.famt}</td>
                      <td>{p.flag === 1
                        ? <span className="badge bg-success">Paid</span>
                        : <span className="badge bg-danger">Unpaid</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* ================= ADD PASSBOOK ================= */}
          {view === "addpb" && (
            <>
              <h4>Add Passbook Entry</h4>
              <div className="card p-3">
                <input className="form-control mb-2" placeholder="RID"
                  value={pb.rid}
                  onChange={e => setPb({ ...pb, rid: e.target.value })} />
                <input type="date" className="form-control mb-2"
                  value={pb.rddate}
                  onChange={e => setPb({ ...pb, rddate: e.target.value })} />
                <input className="form-control mb-2" placeholder="RD Amount"
                  value={pb.rdamt}
                  onChange={e => setPb({ ...pb, rdamt: e.target.value })} />
                <input className="form-control mb-2" placeholder="Late Days"
                  value={pb.lday}
                  onChange={e => setPb({ ...pb, lday: e.target.value })} />
                <input className="form-control mb-2" placeholder="Fine Amount"
                  value={pb.famt}
                  onChange={e => setPb({ ...pb, famt: e.target.value })} />
                <select className="form-control mb-3" value={pb.flag} onChange={e => setPb({ ...pb, flag: Number(e.target.value) })}>
                <option value="1">Paid</option>
                <option value="0">Unpaid</option>
                </select>

                <button className="btn btn-success" onClick={addPassbookEntry}>
                  Add Entry
                </button>
              </div>
            </>
          )}

          {/* ================= TOTAL ================= */}
          {view === "total" && (
            <div className="alert alert-success fs-4">
              Total RD Collection: ₹ {totalAmt}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

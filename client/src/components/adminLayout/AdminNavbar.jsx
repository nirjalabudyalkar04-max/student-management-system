import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#222" }}>
      <NavLink to="/admin/dashboard" style={{ color: "#fff", marginRight: "15px" }}>
        Dashboard
      </NavLink>
      <NavLink to="/admin/profile" style={{ color: "#fff", marginRight: "15px" }}>
        Profile
      </NavLink>
      <NavLink to="/admin/change-password" style={{ color: "#fff", marginRight: "15px" }}>
        Change Password
      </NavLink>
      <NavLink to="/admin/students-details" style={{ color: "#fff", marginRight: "15px" }}>
        Student Details
      </NavLink>
      <button onClick={logout} style={{ float: "right" }}>
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
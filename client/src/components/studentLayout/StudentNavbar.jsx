import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentNavbar = ({ student }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle = {
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(0,0,0,0.3)",
        color: "#fff",
      }}
    >
      {/* Left */}
      <h2 style={{ margin: 0 }}>🎓 Student Panel</h2>

      {/* Right Menu */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <span style={linkStyle} onClick={() => navigate("/student/dashboard")}>
          Dashboard
        </span>

        <span style={linkStyle} onClick={() => navigate("/student/profile")}>
          Profile
        </span>

        <span
          style={linkStyle}
          onClick={() => navigate("/student/change-password")}
        >
          Change Password
        </span>

        <span
          style={linkStyle}
          onClick={() => navigate("/student/noticeboard")}
        >
          Notice Board
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FaUserCircle />
          {student?.name || "Student"}
        </div>

        <button
          onClick={logout}
          style={{
            background: "#d50000",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default StudentNavbar;
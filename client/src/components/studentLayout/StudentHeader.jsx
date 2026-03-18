import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentHeader = ({ student }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle = {
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <header
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

        <span style={linkStyle} onClick={() => navigate("/student/notice")}>
          Notice Board
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FaUserCircle />
          {student?.name || "Student"}
        </div>

        <button
          onClick={logout}
          style={{
            background: "red",
            border: "none",
            padding: "6px 10px",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
};

export default StudentHeader;
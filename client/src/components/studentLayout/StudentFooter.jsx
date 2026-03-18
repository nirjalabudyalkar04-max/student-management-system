import React from "react";
import { FaUser, FaSignOutAlt, FaEnvelope } from "react-icons/fa";

const StudentFooter = () => {
  return (
    <footer
      style={{
        marginTop: "60px",
        padding: "30px 20px",
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(8px)",
        color: "#ffffff",
        borderTop: "1px solid rgba(255,255,255,0.2)",
        textAlign: "center",
      }}
    >
      {/* Middle Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "5px" }}>Student Management System</h2>

        <p style={{ fontSize: "14px", opacity: "0.8" }}>
          Empowering Students Through Technology
        </p>
      </div>

      {/* Links */}
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          gap: "25px",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        <span style={{ cursor: "pointer" }}>
          <FaUser /> Profile
        </span>

        <span style={{ cursor: "pointer" }}>
          <FaEnvelope /> Contact
        </span>

        <span style={{ cursor: "pointer" }}>
          <FaSignOutAlt /> Logout
        </span>
      </div>

      {/* Bottom */}
      <div
        style={{
          fontSize: "13px",
          opacity: "0.7",
        }}
      >
        © {new Date().getFullYear()} Student Management System | All rights reserved
      </div>
    </footer>
  );
};

export default StudentFooter;
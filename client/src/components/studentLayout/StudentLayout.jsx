import React from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import StudentFooter from "./StudentFooter";

const StudentLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg,#134e5e,#71b280)",
      }}
    >
      {/* Navbar */}
      <StudentNavbar />

      {/* Page Content */}
      <div style={{ flex: 1, padding: "40px" }}>
        <Outlet />
      </div>

      {/* Footer */}
      <StudentFooter />
    </div>
  );
};

export default StudentLayout;
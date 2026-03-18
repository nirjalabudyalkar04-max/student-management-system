import React from "react";
import GuestHeader from "./GuestHeader";
import { Outlet } from "react-router-dom";
import GuestFooter from "./GuestFooter";

const GuestLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <GuestHeader />
      </div>

      {/* Page content */}
      <div style={{ flex: 1, paddingTop: "75px", paddingBottom: "40px" }}>
        <Outlet />
      </div>

      {/* Footer */}
      <div
        style={{
          width: "100%",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <GuestFooter />
      </div>

    </div>
  );
};

export default GuestLayout;
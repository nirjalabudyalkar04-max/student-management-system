import React from "react";

const AdminFooter = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <small>
        © {new Date().getFullYear()} Admin Panel | All Rights Reserved
      </small>
    </footer>
  );
};

export default AdminFooter;
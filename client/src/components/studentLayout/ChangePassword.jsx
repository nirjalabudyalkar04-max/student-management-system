import React, { useState } from "react";

const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      alert("All fields required");
      return;
    }

    alert("Password Updated Successfully ✅");
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Change Password 🔑</h1>

        <form onSubmit={handleSubmit}>
          
          {/* OLD PASSWORD */}
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={inputStyle}
          />

          <br />

          {/* NEW PASSWORD (show only after old password entered) */}
          {oldPassword && (
            <>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={inputStyle}
              />
              <br />
            </>
          )}

          {/* UPDATE BUTTON */}
          {oldPassword && newPassword && (
            <button style={btnStyle} type="submit">
              Update Password
            </button>
          )}

        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  width: "300px",
  margin: "10px",
  borderRadius: "5px",
  border: "none"
};

const btnStyle = {
  padding: "8px 20px",
  background: "white",
  border: "2px solid black",
  cursor: "pointer"
};

export default ChangePassword;
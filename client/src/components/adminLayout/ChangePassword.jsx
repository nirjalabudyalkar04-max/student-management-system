import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [data, setData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://student-management-system-zrsh.onrender.com/api/users/change-password",
        data
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div style={{ width: "300px" }}>
      <h2>Change Admin Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;

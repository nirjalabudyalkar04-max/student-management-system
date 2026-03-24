import React, { useEffect, useState } from "react";
import { FaUsers, FaUserClock, FaUserCheck } from "react-icons/fa";

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [pendingStudents, setPendingStudents] = useState(0);
  const [approvedStudents, setApprovedStudents] = useState(0);
  const [allStudents, setAllStudents] = useState([]);

  // Helper function to extract timestamp from MongoDB ObjectId
  const getTimestampFromId = (id) => {
    return new Date(parseInt(id.substring(0, 8), 16) * 1000);
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetch("https://student-management-system-zrsh.onrender.com/api/users");
      const users = await res.json();

      const students = users.filter((u) => u.role === "student");

      setTotalStudents(students.length);
      setPendingStudents(students.filter((s) => !s.isApproved).length);
      setApprovedStudents(students.filter((s) => s.isApproved).length);

      // Sort by createdAt or ObjectId timestamp
      const sortedStudents = [...students].sort(
        (a, b) =>
          new Date(b.createdAt || getTimestampFromId(b._id)) -
          new Date(a.createdAt || getTimestampFromId(a._id))
      );

      setAllStudents(sortedStudents); // ALL students show honge ab
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`https://student-management-system-zrsh.onrender.com/api/users/approve/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json();
        alert("Error: " + data.message);
        return;
      }

      setAllStudents((prev) =>
        prev.map((s) => (s._id === id ? { ...s, isApproved: true } : s))
      );
      setApprovedStudents((prev) => prev + 1);
      setPendingStudents((prev) => prev - 1);
    } catch (err) {
      console.error(err);
      alert("Failed to approve student");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`https://student-management-system-zrsh.onrender.com/api/users/reject/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json();
        alert("Error: " + data.message);
        return;
      }

      setAllStudents((prev) => prev.filter((s) => s._id !== id));
      setTotalStudents((prev) => prev - 1);
      setPendingStudents((prev) => prev - 1);
    } catch (err) {
      console.error(err);
      alert("Failed to reject student");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg,#134e5e,#71b280)",
        fontFamily: "Segoe UI",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "40px" }}>Admin Dashboard</h1>

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          marginBottom: "40px",
        }}
      >
        <Card title="Total Students" count={totalStudents} icon={<FaUsers />} color="#00c853" />
        <Card title="Pending Students" count={pendingStudents} icon={<FaUserClock />} color="#ff9800" />
        <Card title="Approved Students" count={approvedStudents} icon={<FaUserCheck />} color="#2196f3" />
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          padding: "25px",
          borderRadius: "15px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>All Students</h3>
        <table width="100%">
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.course}</td>
                <td>{s.isApproved ? "Approved" : "Pending"}</td>
                <td>
                  {!s.isApproved && (
                    <>
                      <button onClick={() => handleApprove(s._id)} style={approveBtn}>
                        Approve
                      </button>
                      <button onClick={() => handleReject(s._id)} style={rejectBtn}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Card = ({ title, count, icon, color }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.15)",
      padding: "20px",
      borderRadius: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderLeft: `6px solid ${color}`,
    }}
  >
    <div>
      <h4>{title}</h4>
      <h2>{count}</h2>
    </div>
    <div style={{ fontSize: "30px" }}>{icon}</div>
  </div>
);

const approveBtn = {
  background: "#22c55e",
  border: "none",
  padding: "6px 12px",
  marginRight: "5px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
};

const rejectBtn = {
  background: "#ef4444",
  border: "none",
  padding: "6px 12px",
  marginRight: "5px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
};

export default AdminDashboard;

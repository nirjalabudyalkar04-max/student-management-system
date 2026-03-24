import React, { useEffect, useState } from "react";
import { FaClipboardCheck, FaMoneyBill, FaCalendarAlt, FaBullhorn } from "react-icons/fa";

const TOTAL_DAYS = 30;

const StudentDashboard = () => {

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      const res = await fetch("https://student-management-system-zrsh.onrender.com/api/students/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch student data");
        setLoading(false);
        return;
      }

      // attendance fallback
      let attendanceArray = [];

      if (Array.isArray(data.attendance)) {
        attendanceArray = data.attendance;
      } else {
        attendanceArray = Array(TOTAL_DAYS).fill("P");
      }

      setStudent({ ...data, attendance: attendanceArray });
      setLoading(false);

    } catch (err) {
      console.error(err);
      setError("Server error");
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading dashboard...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
  if (!student) return <h3>No student data found</h3>;

  const presentCount = student.attendance.filter((a) => a === "P").length;
  const attendancePercentage = ((presentCount / TOTAL_DAYS) * 100).toFixed(1);

  return (
    <div style={{ padding: "20px", fontFamily: "Segoe UI" }}>

      <h1 style={{ marginBottom: "30px" }}>Student Dashboard</h1>

      {/* Top Cards */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>

        <div style={cardStyle("#3b82f6")}>
          <FaClipboardCheck size={25} />
          <h3>Attendance</h3>
          <p>{attendancePercentage}%</p>
        </div>

        <div style={cardStyle("#22c55e")}>
          <FaMoneyBill size={25} />
          <h3>Fees</h3>
          <p>{student.fees || "Not Updated"}</p>
        </div>

        <div style={cardStyle("#8b5cf6")}>
          <FaCalendarAlt size={25} />
          <h3>Timetable</h3>
          <p>{student.timetable || "Not Available"}</p>
        </div>

        <div style={cardStyle("#f97316")}>
          <FaBullhorn size={25} />
          <h3>Events</h3>
          <p>{student.events || "No Events"}</p>
        </div>

      </div>

      {/* Profile Info */}
      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>

        <h2>Student Info</h2>

        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Year:</strong> {student.year}</p>

        <hr style={{ margin: "20px 0" }} />

        {/* Attendance Table */}

        <h3>Attendance Sheet ({attendancePercentage}%)</h3>

        <div style={{ overflowX: "auto" }}>
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                {student.attendance.map((a, i) => (
                  <td key={i} style={{ textAlign: "center", minWidth: "25px" }}>
                    {a}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <hr style={{ margin: "20px 0" }} />

        <p><FaMoneyBill /> Fees: {student.fees}</p>
        <p><FaCalendarAlt /> Timetable: {student.timetable}</p>
        <p><FaBullhorn /> Events: {student.events}</p>

      </div>

    </div>
  );
};

const cardStyle = (color) => ({
  flex: "1 1 180px",
  background: color,
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  fontWeight: "bold"
});

export default StudentDashboard;

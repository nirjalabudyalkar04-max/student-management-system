import React, { useEffect, useState } from "react";
import { FaClipboardCheck, FaMoneyBill, FaCalendarAlt, FaBullhorn } from "react-icons/fa";

const TOTAL_DAYS = 30;

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApprovedStudents();
  }, []);

  const fetchApprovedStudents = async () => {
    try {
      const res = await fetch("https://student-management-system-hla4.onrender.com");
      const data = await res.json();

      if (res.status !== 200) {
        setError(data.message || "Failed to fetch students");
        return;
      }

      const updated = data.map((stu) => ({
        ...stu,
        attendance:
          Array.isArray(stu.attendance) && stu.attendance.length === TOTAL_DAYS
            ? stu.attendance
            : Array(TOTAL_DAYS).fill("P"),
        fees: stu.fees || "Pending",
        timetable: stu.timetable || "Not Available",
        events: stu.events || "No Events",
      }));

      setStudents(updated);
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  const handleAttendanceChange = (studentId, index, value) => {
    setStudents((prev) =>
      prev.map((stu) => {
        if (stu._id !== studentId) return stu;
        const newAttendance = [...stu.attendance];
        newAttendance[index] = value;
        return { ...stu, attendance: newAttendance };
      })
    );
  };

  const handleFieldChange = (studentId, field, value) => {
    setStudents((prev) =>
      prev.map((stu) =>
        stu._id === studentId ? { ...stu, [field]: value } : stu
      )
    );
  };

  const handleSave = async (stu) => {
    try {
      const res = await fetch(`https://student-management-system-hla4.onrender.com/${stu._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendance: stu.attendance,
          fees: stu.fees,
          timetable: stu.timetable,
          events: stu.events,
        }),
      });

      const data = await res.json();
      alert(data.message || "Saved successfully");
    } catch (err) {
      alert("Failed to save data");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!students.length) return <p>No approved students found.</p>;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#e8f5e9",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#2e7d32" }}>Approved Students</h1>

      {students.map((stu) => {
        const presentCount = stu.attendance.filter((a) => a === "P").length;
        const percentage = ((presentCount / TOTAL_DAYS) * 100).toFixed(1);

        return (
          <div
            key={stu._id}
            style={{
              border: "1px solid #ddd",
              margin: "20px 0",
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{stu.name}</h2>
            <p><strong>Email:</strong> {stu.email}</p>
            <p><strong>Course:</strong> {stu.course}</p>
            <p><strong>Year:</strong> {stu.year}</p>

            <hr />

            <h3>
              <FaClipboardCheck /> Attendance Sheet ({percentage}%)
            </h3>

            <div style={{ overflowX: "auto" }}>
              <table
                border="1"
                cellPadding="5"
                style={{ borderCollapse: "collapse", width: "100%" }}
              >
                <tbody>
                  <tr>
                    {stu.attendance.map((att, idx) => (
                      <td key={idx}>
                        <select
                          value={att}
                          onChange={(e) =>
                            handleAttendanceChange(stu._id, idx, e.target.value)
                          }
                          style={{
                            backgroundColor: att === "P" ? "#4CAF50" : "#e74c3c",
                            color: "white",
                            fontWeight: "bold",
                            border: "none",
                            padding: "5px",
                            borderRadius: "4px",
                          }}
                        >
                          <option value="P">P</option>
                          <option value="A">A</option>
                        </select>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "15px" }}>
              <p>
                <FaMoneyBill /> Fees:{" "}
                <input
                  type="text"
                  value={stu.fees}
                  onChange={(e) =>
                    handleFieldChange(stu._id, "fees", e.target.value)
                  }
                />
              </p>

              <p>
                <FaCalendarAlt /> Timetable:{" "}
                <input
                  type="text"
                  value={stu.timetable}
                  onChange={(e) =>
                    handleFieldChange(stu._id, "timetable", e.target.value)
                  }
                />
              </p>

              <p>
                <FaBullhorn /> Events:{" "}
                <input
                  type="text"
                  value={stu.events}
                  onChange={(e) =>
                    handleFieldChange(stu._id, "events", e.target.value)
                  }
                />
              </p>
            </div>

            <button
              onClick={() => handleSave(stu)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                backgroundColor: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default StudentDetails;

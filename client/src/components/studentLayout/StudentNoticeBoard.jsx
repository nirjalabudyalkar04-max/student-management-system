import React, { useEffect, useState } from "react";

const StudentNoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("https://student-management-system-8hjo.onrender.com");
        const data = await response.json();

        if (Array.isArray(data)) {
          setNotices(data);
        } else {
          setNotices([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching notices:", error);
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading Notices...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg,#0f2027,#2c5364)",
        fontFamily: "Segoe UI",
        color: "#fff",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>📢 Student Notice Board</h1>

      {notices.length === 0 ? (
        <p>No notices available</p>
      ) : (
        notices.map((notice) => (
          <div
            key={notice._id}
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
              backdropFilter: "blur(8px)",
            }}
          >
            <h3>{notice.title}</h3>

            <p style={{ marginTop: "10px" }}>{notice.message}</p>

            <small style={{ opacity: 0.8 }}>
              {notice.createdAt
                ? new Date(notice.createdAt).toLocaleDateString()
                : ""}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentNoticeBoard;

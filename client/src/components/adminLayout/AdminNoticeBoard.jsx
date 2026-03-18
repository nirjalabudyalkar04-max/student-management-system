import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminNoticeBoard = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    const res = await axios.get("https://student-management-system-8hjo.onrender.com");
    setNotices(res.data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("https://student-management-system-8hjo.onrender.com", {
      title,
      message,
    });

    setTitle("");
    setMessage("");
    fetchNotices();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://student-management-system-8hjo.onrender.com/${id}`);
    fetchNotices();
  };

  return (
    <div className="container mt-4">
      <h2>📢 Admin Notice Board</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Notice Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button className="btn btn-primary">Add Notice</button>
      </form>

      {notices.map((notice) => (
        <div key={notice._id} className="card mb-3">
          <div className="card-body">
            <h5>{notice.title}</h5>
            <p>{notice.message}</p>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(notice._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminNoticeBoard;

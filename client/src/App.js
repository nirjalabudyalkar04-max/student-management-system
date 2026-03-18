import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import GuestLayout from "./components/guestLayout/GuestLayout";
import Home from "./components/guestLayout/Home";
import Register from "./components/guestLayout/Register";
import Login from "./components/guestLayout/Login";
import ForgotPassword from "./components/guestLayout/ForgotPassword";

import AdminLayout from "./components/adminLayout/AdminLayout";
import AdminDashboard from "./components/adminLayout/AdminDashboard";
import AdminProfile from "./components/adminLayout/AdminProfile";
import ChangePassword from "./components/adminLayout/ChangePassword";
import AdminNoticeBoard from "./components/adminLayout/AdminNoticeBoard";
import StudentDetails from "./components/adminLayout/StudentDetails";

import StudentLayout from "./components/studentLayout/StudentLayout";
import StudentDashboard from "./components/studentLayout/StudentDashboard";
import StudentProfile from "./components/studentLayout/StudentProfile";
import StudentNoticeBoard from "./components/studentLayout/StudentNoticeBoard";
import ChangePasswordStudent from "./components/studentLayout/ChangePassword";

function App() {
  return (
    <div className="App">
      <Routes>

        {/* ---------- GUEST ROUTES ---------- */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="noticeboard" element={<AdminNoticeBoard />} />
          <Route path="students-details" element={<StudentDetails />} />
        </Route>

        {/* ---------- STUDENT ROUTES ---------- */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="change-password" element={<ChangePasswordStudent />} />
          <Route path="noticeboard" element={<StudentNoticeBoard />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
import express from "express";

import {
  loginUser,
  registerUser,
  forgotPassword,
  changePassword,
  getUserProfile,
  updateProfile,
  approveStudent,
  getRecentStudents,
  getAllUsers,
  adminDashboardStats,
  getPendingStudents,
  deleteStudent,
  updateAttendance,
  updateFees,
  updateTimetable,
  updateEvents,
  getApprovedStudentDetails,
  getAllApprovedStudents,
  updateStudentData,
  getApprovedStudentById, 
  getStudentById
} from "../controllers/UserController.js";

const UserRouter = express.Router();

/* ================= AUTH ================= */

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);

/* ================= PASSWORD ================= */

UserRouter.post("/forgot-password", forgotPassword);
UserRouter.post("/change-password", changePassword);

/* ================= PROFILE ================= */

UserRouter.get("/profile", getUserProfile);
UserRouter.put("/profile", updateProfile);

/* ================= ADMIN DASHBOARD ================= */

UserRouter.get("/admin/stats", adminDashboardStats);

/* ================= STUDENTS ================= */

UserRouter.get("/", getAllUsers);

UserRouter.get("/pending", getPendingStudents);

UserRouter.put("/approve/:id", approveStudent);

UserRouter.delete("/delete/:id", deleteStudent);

/* ================= RECENT STUDENTS ================= */

UserRouter.get("/recent", getRecentStudents);
UserRouter.get("/approved/:id/details", getApprovedStudentDetails);
UserRouter.get("/approved/all", getAllApprovedStudents);
UserRouter.get("/approved/:id", getApprovedStudentById);
UserRouter.put("/update/:id", updateStudentData);
UserRouter.get("/:id", getStudentById);


/* ================= ADMIN UPDATE STUDENT DATA ================= */

UserRouter.put("/attendance/:id", updateAttendance);

UserRouter.put("/fees/:id", updateFees);

UserRouter.put("/timetable/:id", updateTimetable);

UserRouter.put("/events/:id", updateEvents);

export default UserRouter;
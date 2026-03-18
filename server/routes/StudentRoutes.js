import express from "express";
import {
  getStudentProfile,
  getAllStudents,
  getPendingStudents,
  approveStudent,
  deleteStudent,
  updateStudentProfile,
  changeStudentPassword,
  getStudentDetails
} from "../controllers/StudentController.js";

const router = express.Router();

// routes without middleware

router.get("/profile", getStudentProfile);

router.get("/", getAllStudents);

router.get("/pending", getPendingStudents);

router.put("/approve/:id", approveStudent);

router.delete("/:id", deleteStudent);

router.put("/profile/update", updateStudentProfile);

router.put("/change-password", changeStudentPassword);

router.get("/:id", getStudentDetails); // for dashboard

export default router;
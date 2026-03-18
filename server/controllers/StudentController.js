import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ==============================
1️⃣ Get Logged In Student Profile
============================== */
export const getStudentProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const student = await User.findById(decoded.id).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* ==============================
   2️⃣ Get All Students (Admin)
============================== */
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==============================
   3️⃣ Get Pending Students
============================== */
export const getPendingStudents = async (req, res) => {
  try {
    const students = await User.find({
      role: "student",
      isApproved: false
    }).select("-password");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==============================
   4️⃣ Approve Student
============================== */
export const approveStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student)
      return res.status(404).json({ message: "Student not found" });

    student.isApproved = true;

    await student.save();

    res.status(200).json({ message: "Student approved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==============================
   5️⃣ Delete Student
============================== */
export const deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student)
      return res.status(404).json({ message: "Student not found" });

    await student.deleteOne();

    res.status(200).json({ message: "Student deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==============================
   6️⃣ Update Student Profile
============================== */
export const updateStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student)
      return res.status(404).json({ message: "Student not found" });

    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.course = req.body.course || student.course;
    student.year = req.body.year || student.year;

    await student.save();

    res.status(200).json({ message: "Profile updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==============================
   7️⃣ Change Student Password
============================== */
export const changeStudentPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const student = await User.findById(req.params.id);

    if (!student)
      return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(oldPassword, student.password);

    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);

    await student.save();

    res.status(200).json({ message: "Password changed successfully ✅" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==============================
   8️⃣ Get Student Details by ID
   Used for Student Dashboard
============================== */
export const getStudentDetails = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select(
      "name email course year attendance fees timetable events"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
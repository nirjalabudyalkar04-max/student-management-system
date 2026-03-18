import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

/* ================= EMAIL UTILITY ================= */
const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Student Portal" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  });
};

/* ================= REGISTER USER ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password, course, year, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      contact,
      password: hashedPassword,
      course,
      year,
      role: role === "admin" ? "admin" : "student",
      isApproved: role === "admin" ? true : false,
    });

    res.status(201).json({
      message:
        role === "admin"
          ? "Admin registered successfully"
          : "Student registered. Waiting for admin approval.",
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found ❌" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials ❌" });

    // 🔥 BLOCK STUDENT IF NOT APPROVED
    if (user.role === "student" && !user.isApproved) {
      return res.status(403).json({
        message: "Your account is not approved by admin yet ❌",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed ❌",
      error: error.message,
    });
  }
};

/* ================= ADMIN DASHBOARD STATS ================= */
export const adminDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const approvedStudents = await User.countDocuments({
      role: "student",
      isApproved: true,
    });
    const pendingStudents = await User.countDocuments({
      role: "student",
      isApproved: false,
    });

    res.status(200).json({
      totalStudents,
      approvedStudents,
      pendingStudents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard ❌",
      error: error.message,
    });
  }
};

/* ================= GET PENDING STUDENTS ================= */
export const getPendingStudents = async (req, res) => {
  try {
    const students = await User.find({
      role: "student",
      isApproved: false,
    }).select("-password");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students ❌",
      error: error.message,
    });
  }
};

/* ================= APPROVE STUDENT ================= */
export const approveStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    if (!student)
      return res.status(404).json({ message: "Student not found ❌" });

    res.status(200).json({ message: "Student approved ✅" });
  } catch (error) {
    res.status(500).json({
      message: "Approval failed ❌",
      error: error.message,
    });
  }
};

/* ================= REJECT (DELETE) STUDENT ================= */
export const rejectStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the student
    const student = await User.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found ❌" });
    }

    res.status(200).json({ message: "Student rejected & deleted ❌" });
  } catch (error) {
    res.status(500).json({
      message: "Rejection failed ❌",
      error: error.message,
    });
  }
};

/* ================= DELETE STUDENT ================= */
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findByIdAndDelete(id);
    if (!student)
      return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= FORGOT PASSWORD (ADMIN) ================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email, role: "admin" });
    if (!user)
      return res.status(404).json({ message: "Admin not found ❌" });

    const tempPassword = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.password = await bcrypt.hash(tempPassword, 10);
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Admin Password Reset 🔐",
      html: `<h3>${tempPassword}</h3>`,
    });

    res.status(200).json({ message: "Temporary password sent ✅" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reset password ❌",
      error: error.message,
    });
  }
};
// -------------------- GET USER PROFILE --------------------
// GET /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    const token = auth.split(" ")[1];

    // ✅ USE SAME SECRET AS LOGIN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ SEND USER DIRECTLY (frontend expects this)
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get profile ❌",
      error: error.message,
    });
  }
};
// -------------------- UPDATE PROFILE --------------------
// PUT /api/users/profile
export const updateProfile = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { name, email, contact } = req.body;

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.contact = contact;

    await user.save();

    // ✅ RETURN UPDATED USER
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile ❌",
      error: error.message,
    });
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { email, old_password, new_password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(old_password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(new_password, salt);

    await user.save();

    res.json({ message: "Password changed successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
// 🔥 ADD THIS FUNCTION
export const adminChangePassword = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { email, old_password, new_password } = req.body;

    if (!email || !old_password || !new_password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await User.findOne({
      _id: decoded.id,
      email,
      role: "admin",
    });

    if (!admin) {
      return res.status(403).json({ message: "Admin not authorized" });
    }

    const isMatch = await bcrypt.compare(old_password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    admin.password = await bcrypt.hash(new_password, 10);
    await admin.save();

    res.status(200).json({ message: "Admin password changed successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
// GET recent students
export const getRecentStudent = async (req, res) => {
  try {
    const students = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* ================= RECENT STUDENTS ================= */
export const getRecentStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const registerStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get all user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentDashboard = async (req,res) => {

  try {

    const student = await User.findById(req.params.id);

    if(!student){
      return res.json({message:"Student not found"});
    }

    res.json({
      attendance: student.attendance,
      fees: student.fees,
      timetable: student.timetable,
      events: student.events
    });

  } catch(error){
    console.log(error);
    res.status(500).json({message:"Server error"});
  }

};
// GET STUDENT DATA
export const getStudentData = async (req, res) => {
  try {

    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      attendance: student.attendance,
      fees: student.fees,
      timetable: student.timetable,
      events: student.events
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update attendance (array of { subject, present })
export const updateAttendance = async (req, res) => {
  try {
    const { attendance } = req.body; // array of { subject, present: true/false }

    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.attendance = attendance;
    await student.save();

    res.json({ message: "Attendance updated", attendance: student.attendance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update fees
export const updateFees = async (req, res) => {
  try {
    const { fees } = req.body; // can be { total, paid, due }
    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.fees = fees;
    await student.save();

    res.json({ message: "Fees updated", fees: student.fees });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update timetable
export const updateTimetable = async (req, res) => {
  try {
    const { timetable } = req.body; // array of { day, subject, time }
    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.timetable = timetable;
    await student.save();

    res.json({ message: "Timetable updated", timetable: student.timetable });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update events
export const updateEvents = async (req, res) => {
  try {
    const { events } = req.body; // array of { title, date }
    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.events = events;
    await student.save();

    res.json({ message: "Events updated", events: student.events });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all approved students
export const getAllApprovedStudents = async (req, res) => {
  try {
    const students = await User.find({ isApproved: true }).select(
      "name email course year attendance fees timetable events"
    );

    if (!students.length) {
      return res.status(404).json({ message: "No approved students found" });
    }

    res.json(students); // send array of approved students
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// 🔹 Get approved student details by ID
export const getApprovedStudentDetails = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, isApproved: true }).select(
      "name email course year attendance fees timetable events"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found or not approved" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update student data (attendance, fees, timetable, events)
export const updateStudentData = async (req, res) => {
  try {
    const { attendance, fees, timetable, events } = req.body;
    const student = await User.findById(req.params.id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    if (attendance) student.attendance = attendance;
    if (fees) student.fees = fees;
    if (timetable) student.timetable = timetable;
    if (events) student.events = events;

    await student.save();

    res.json({ message: "Student data updated", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single approved student by ID
export const getApprovedStudentById = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, isApproved: true });

    if (!student) {
      return res.status(404).json({ message: "Approved student not found" });
    }

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Get single student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

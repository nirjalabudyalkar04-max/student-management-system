import mongoose from "mongoose";

const TOTAL_DAYS = 30;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contact: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    course: { type: String, required: true },
    year: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    isApproved: { type: Boolean, default: false },

    // 🔥 Horizontal attendance for 30 days (P/A)
    attendance: {
      type: [String],
      default: Array(TOTAL_DAYS).fill("P"), // all present by default
    },

    fees: { type: String, default: "Pending" },
    timetable: { type: String, default: "Not Available" },
    events: { type: String, default: "No Events" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
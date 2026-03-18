import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/UserRouter.js";
import noticeRoutes from "./routes/noticeBoardRoutes.js"; // 👈 ADD THIS
import studentRoutes from "./routes/StudentRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "student",
  })
  .then(() => console.log("MongoDB connected to student DB ✅"))
  .catch((err) => console.error("MongoDB error ❌", err.message));

// Routes
app.use("/api/users", userRouter);
app.use("/api/notices", noticeRoutes); // 👈 ADD THIS
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
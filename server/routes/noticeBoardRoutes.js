import express from "express";
import {
  addNotice,
  getNotices,
  deleteNotice,
} from "../controllers/NoticeBoardController.js";

const router = express.Router();

// Add new notice
router.post("/add", addNotice);

// Get all notices
router.get("/", getNotices);

// Delete notice
router.delete("/:id", deleteNotice);

export default router;
import Notice from "../models/Notice.js";

// Add Notice
export const addNotice = async (req, res) => {
  try {
    const { title, message } = req.body;

    const notice = await Notice.create({ title, message });

    res.status(201).json({
      success: true,
      notice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Notices
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Notice
export const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
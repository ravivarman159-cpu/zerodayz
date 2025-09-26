const express = require("express");
const Applicant = require("../models/Applicant");
const router = express.Router();

// Submit application
router.post("/apply", async (req, res) => {
  try {
    const applicant = new Applicant(req.body);
    await applicant.save();
    res.json({ success: true, message: "Application submitted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all applicants (for admin only)
router.get("/all", async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

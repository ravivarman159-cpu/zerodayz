const express = require("express");
const Job = require("../models/Job");
const router = express.Router();

// Add new job vacancy
router.post("/add", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json({ success: true, message: "Job added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update job vacancy count
router.put("/update/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all jobs (to show on map)
router.get("/all", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

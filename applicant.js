const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  workTime: String,
  message: String,
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Applicant", ApplicantSchema);

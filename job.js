const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  position: String,
  description: String,
  workTime: String,
  location: {
    lat: Number,
    lng: Number,
  },
  vacancies: { type: Number, default: 1 },
});

module.exports = mongoose.model("Job", JobSchema);

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json"); // Download from Firebase console
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// ------------------- Admin Login -------------------
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if(username === ADMIN_USER && password === ADMIN_PASS){
    res.json({ success: true });
  } else {
    res.json({ success: false, error: "Invalid credentials" });
  }
});

// ------------------- Add Job Vacancy -------------------
app.post("/admin/add-job", async (req, res) => {
  try {
    const { title, area, address, time, vacancies, lat, lng } = req.body;
    await db.collection("jobVacancies").add({
      title, area, address, time, vacancies, location: {lat,lng}, createdAt: new Date()
    });
    res.json({ success: true });
  } catch(err){
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------- Applicant Form Submit -------------------
app.post("/applicant/submit", async (req, res) => {
  try {
    const { name, phone, position, worktime, message } = req.body;
    await db.collection("applicants").add({
      name, phone, position, worktime, message, createdAt: new Date()
    });
    res.json({ success: true });
  } catch(err){
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------- Get Jobs -------------------
app.get("/jobs", async (req, res) => {
  try {
    const snapshot = await db.collection("jobVacancies").get();
    let jobs = [];
    snapshot.forEach(doc => jobs.push(doc.data()));
    res.json(jobs);
  } catch(err){
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

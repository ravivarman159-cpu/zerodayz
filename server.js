// backend/index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Firebase Web SDK (client-like) via npm
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ------------------ Initialize Firebase ------------------
const firebaseConfig = {
  apiKey: "AIzaSyC4wcIagcPYJr76tEczcjvFNJYiEBqoNKE",
  authDomain: "zerodayz-8564a.firebaseapp.com",
  projectId: "zerodayz-8564a",
  storageBucket: "zerodayz-8564a.firebasestorage.app",
  messagingSenderId: "462027652887",
  appId: "1:462027652887:web:a857d0b39101e80826c152",
  measurementId: "G-FZT3F6C1HB"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// ------------------ Admin Login ------------------
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

// ------------------ Add Job Vacancy ------------------
app.post("/admin/add-job", async (req, res) => {
  try {
    const { title, area, address, time, vacancies, lat, lng } = req.body;
    await addDoc(collection(db, "jobVacancies"), {
      title,
      area,
      address,
      time,
      vacancies,
      location: { lat, lng },
      createdAt: new Date()
    });
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------ Applicant Form Submit ------------------
app.post("/applicant/submit", async (req, res) => {
  try {
    const { name, phone, position, worktime, message } = req.body;
    await addDoc(collection(db, "applicants"), {
      name,
      phone,
      position,
      worktime,
      message,
      createdAt: new Date()
    });
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------ Get Jobs ------------------
app.get("/jobs", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "jobVacancies"));
    const jobs = snapshot.docs.map(doc => doc.data());
    res.json(jobs);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

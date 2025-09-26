const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applicants", require("./routes/applicantRoutes"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

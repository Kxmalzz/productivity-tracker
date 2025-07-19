const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend (optional)
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose Schema & Model
const UserActivity = require("./models/UserActivity");

// POST Route: Save activity
app.post("/api/activity/track", async (req, res) => {
  try {
    const { task, duration, url } = req.body;
    const date = new Date().toISOString().split("T")[0];

    // Check if an entry already exists for same task and date
    let existingActivity = await UserActivity.findOne({ task, date });

    if (existingActivity) {
      // Update existing activity duration
      existingActivity.duration += duration;
      await existingActivity.save();
      io.emit("new-activity", existingActivity);
      return res.status(200).json({ message: "Activity updated." });
    }

    // Create new activity
    const newActivity = new UserActivity({ task, duration, url, date });
    const savedActivity = await newActivity.save();
    io.emit("new-activity", savedActivity);
    res.status(200).json({ message: "Activity saved." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET Route: Fetch all activities
app.get("/api/activity/report", async (req, res) => {
  try {
    const activities = await UserActivity.find().sort({ createdAt: -1 });
    res.status(200).json(activities);
  } catch (error) {
    console.error("GET Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/productivity_tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    server.listen(5000, () => {
      console.log("🚀 Server running at http://localhost:5000");
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
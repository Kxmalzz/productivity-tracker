const express = require("express");
const router = express.Router();
const UserActivity = require("../models/UserActivity");

module.exports = (io) => {
  // POST /api/activity/track
  router.post("/track", async (req, res) => {
    try {
      const { task, duration, url } = req.body;

      const activity = new UserActivity({
        task,
        duration,
        url,
        date: new Date().toISOString().split("T")[0],
      });

      const savedActivity = await activity.save();

      // Emit to all connected clients for real-time update
      io.emit("new-activity", savedActivity);

      res.status(200).json({ message: "✅ Activity saved successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/activity/report
  router.get("/report", async (req, res) => {
    try {
      const activities = await UserActivity.find().sort({ createdAt: -1 });
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
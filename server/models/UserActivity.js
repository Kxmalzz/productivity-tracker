const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  task: { type: String, required: true },
  duration: { type: Number, required: true },
  url: { type: String },
  date: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model("UserActivity", userActivitySchema);
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  domain: String,
  duration: Number, // in minutes
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
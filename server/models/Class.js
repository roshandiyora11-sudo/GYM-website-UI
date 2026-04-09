const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },          // e.g. "Yoga", "HIIT", "Crossfit"
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  dayOfWeek: { type: Number, required: true, min: 0, max: 6 }, // 0=Mon, 6=Sun
  startTime: { type: String, required: true },     // "08:00"
  endTime: { type: String, required: true },       // "09:30"
  capacity: { type: Number, default: 20 },
  color: { type: String, default: '#dc2626' },     // for calendar display
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('GymClass', classSchema);

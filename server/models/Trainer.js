const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  schedule: [{
    day: String,
    time: String
  }],
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, required: true },
    comment: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Trainer', trainerSchema);

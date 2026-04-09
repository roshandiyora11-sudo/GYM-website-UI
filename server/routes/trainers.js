const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');
const { protect, admin } = require('../middleware/auth');

// @route GET /api/trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find({});
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/trainers (Admin only)
router.post('/', protect, admin, async (req, res) => {
  const { name, specialization, image, bio, schedule } = req.body;
  try {
    const trainer = new Trainer({ name, specialization, image, bio, schedule });
    const savedTrainer = await trainer.save();
    res.status(201).json(savedTrainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route POST /api/trainers/:id/rate
router.post('/:id/rate', protect, async (req, res) => {
  const { score, comment } = req.body;
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    // Check if user already rated
    const existingRatingIndex = trainer.ratings.findIndex(r => r.user.toString() === req.user._id.toString());
    
    if (existingRatingIndex >= 0) {
      trainer.ratings[existingRatingIndex].score = score;
      trainer.ratings[existingRatingIndex].comment = comment;
    } else {
      trainer.ratings.push({ user: req.user._id, score, comment });
    }

    await trainer.save();
    res.status(200).json({ message: 'Rating submitted', trainer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

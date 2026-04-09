const express = require('express');
const router = express.Router();
const GymClass = require('../models/Class');
const { protect, admin } = require('../middleware/auth');

// GET all classes (public - for the calendar)
router.get('/', async (req, res) => {
  try {
    const classes = await GymClass.find({}).populate('trainer', 'name specialization');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create class (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const gymClass = new GymClass(req.body);
    const saved = await gymClass.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a class (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await GymClass.findByIdAndDelete(req.params.id);
    res.json({ message: 'Class removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

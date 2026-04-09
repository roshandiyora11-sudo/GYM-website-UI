const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/auth');

// @route GET /api/bookings (User's bookings)
router.get('/mybookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('trainer');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/bookings (Admin sees all)
router.get('/', protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user').populate('trainer');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/bookings
router.post('/', protect, async (req, res) => {
  const { trainer, className, date } = req.body;
  try {
    const booking = new Booking({
      user: req.user._id,
      trainer,
      className,
      date,
    });
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route DELETE /api/bookings/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    // Check if user owns booking or is admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route PATCH /api/bookings/:id/status
router.patch('/:id/status', protect, admin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    if (['pending', 'confirmed', 'cancelled'].includes(req.body.status)) {
      booking.status = req.body.status;
      const updatedBooking = await booking.save();
      
      // We populate user and trainer so the frontend has the full object
      const populatedBooking = await Booking.findById(updatedBooking._id).populate('user').populate('trainer');
      res.json(populatedBooking);
    } else {
      res.status(400).json({ message: 'Invalid status' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

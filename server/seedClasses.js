const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trainer = require('./models/Trainer');
const GymClass = require('./models/Class');

dotenv.config();

const seedClasses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Get or create trainers
    let trainers = await Trainer.find({});
    if (trainers.length === 0) {
      trainers = await Trainer.insertMany([
        { name: 'Alex Rivera', specialization: 'HIIT & Crossfit' },
        { name: 'Sarah Chen', specialization: 'Yoga & Pilates' },
        { name: 'Marcus Johnson', specialization: 'Strength & Boxing' },
        { name: 'Priya Patel', specialization: 'Zumba & Dance Cardio' },
      ]);
      console.log('Trainers seeded');
    }

    // Clear existing classes
    await GymClass.deleteMany({});

    const classData = [
      // Monday (0)
      { name: 'Morning Yoga', trainer: trainers[1]._id, dayOfWeek: 0, startTime: '07:00', endTime: '08:00', color: '#7c3aed', description: 'Start your week with mindful movement', capacity: 15 },
      { name: 'HIIT Blast', trainer: trainers[0]._id, dayOfWeek: 0, startTime: '09:00', endTime: '10:00', color: '#dc2626', description: 'High intensity interval training', capacity: 20 },
      { name: 'Strength Circuit', trainer: trainers[2]._id, dayOfWeek: 0, startTime: '18:00', endTime: '19:30', color: '#d97706', description: 'Full body strength training', capacity: 20 },
      // Tuesday (1)
      { name: 'Pilates Flow', trainer: trainers[1]._id, dayOfWeek: 1, startTime: '07:00', endTime: '08:00', color: '#7c3aed', description: 'Core strength and flexibility', capacity: 15 },
      { name: 'Boxing Cardio', trainer: trainers[2]._id, dayOfWeek: 1, startTime: '10:00', endTime: '11:00', color: '#b91c1c', description: 'Boxing-inspired cardio workout', capacity: 18 },
      { name: 'Zumba Night', trainer: trainers[3]._id, dayOfWeek: 1, startTime: '19:00', endTime: '20:00', color: '#059669', description: 'Dance your calories away', capacity: 25 },
      // Wednesday (2)
      { name: 'Morning HIIT', trainer: trainers[0]._id, dayOfWeek: 2, startTime: '06:30', endTime: '07:30', color: '#dc2626', description: 'Early bird HIIT session', capacity: 20 },
      { name: 'Yoga & Meditation', trainer: trainers[1]._id, dayOfWeek: 2, startTime: '11:00', endTime: '12:30', color: '#7c3aed', description: 'Deep stretch and mindfulness', capacity: 15 },
      { name: 'Crossfit WOD', trainer: trainers[0]._id, dayOfWeek: 2, startTime: '17:00', endTime: '18:30', color: '#ea580c', description: 'Workout of the Day', capacity: 20 },
      // Thursday (3)
      { name: 'Strength Training', trainer: trainers[2]._id, dayOfWeek: 3, startTime: '07:00', endTime: '08:30', color: '#d97706', description: 'Power lifting fundamentals', capacity: 20 },
      { name: 'Zumba Express', trainer: trainers[3]._id, dayOfWeek: 3, startTime: '12:00', endTime: '13:00', color: '#059669', description: 'Lunchtime dance fitness', capacity: 25 },
      { name: 'Boxing Fundamentals', trainer: trainers[2]._id, dayOfWeek: 3, startTime: '18:00', endTime: '19:00', color: '#b91c1c', description: 'Learn boxing basics', capacity: 18 },
      // Friday (4)
      { name: 'TGIF Yoga', trainer: trainers[1]._id, dayOfWeek: 4, startTime: '08:00', endTime: '09:00', color: '#7c3aed', description: 'Wind-down yoga for the week', capacity: 15 },
      { name: 'HIIT Friday', trainer: trainers[0]._id, dayOfWeek: 4, startTime: '17:00', endTime: '18:00', color: '#dc2626', description: 'End the week strong', capacity: 20 },
      { name: 'Dance Cardio', trainer: trainers[3]._id, dayOfWeek: 4, startTime: '19:00', endTime: '20:00', color: '#059669', description: 'Friday night dance party workout', capacity: 25 },
      // Saturday (5)
      { name: 'Weekend Warriors', trainer: trainers[0]._id, dayOfWeek: 5, startTime: '09:00', endTime: '10:30', color: '#dc2626', description: 'Intense weekend session', capacity: 20 },
      { name: 'Pilates & Stretch', trainer: trainers[1]._id, dayOfWeek: 5, startTime: '11:00', endTime: '12:00', color: '#7c3aed', description: 'Deep stretch and pilates', capacity: 15 },
      // Sunday (6)
      { name: 'Sunday Yoga', trainer: trainers[1]._id, dayOfWeek: 6, startTime: '09:00', endTime: '10:30', color: '#7c3aed', description: 'Relaxing Sunday yoga session', capacity: 15 },
      { name: 'Active Recovery', trainer: trainers[2]._id, dayOfWeek: 6, startTime: '11:00', endTime: '12:00', color: '#0891b2', description: 'Gentle recovery workout', capacity: 20 },
    ];

    await GymClass.insertMany(classData);
    console.log(`✅ ${classData.length} classes seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error('Error seeding classes:', error.message);
    process.exit(1);
  }
};

seedClasses();

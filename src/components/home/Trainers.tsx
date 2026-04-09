import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Award, Calendar, Heart } from 'lucide-react';

export function Trainers() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const trainers = [
    {
      name: "Marcus Steel",
      role: "Head Strength Coach",
      image: "https://images.unsplash.com/photo-1549995546-87cb41aa98a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcGVyc29uYWwlMjB0cmFpbmVyJTIwY29hY2h8ZW58MXx8fHwxNzc1NjE5OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      specialty: "Powerlifting & Bodybuilding",
      experience: "12+ Years",
      certifications: "CSCS, NASM-CPT"
    },
    {
      name: "Sophia Chen",
      role: "Yoga & Wellness Expert",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmaXRuZXNzJTIwdHJhaW5lciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzU1NDYwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      specialty: "Yoga & Mindfulness",
      experience: "8+ Years",
      certifications: "RYT-500, Wellness Coach"
    },
    {
      name: "David Martinez",
      role: "HIIT & Cardio Specialist",
      image: "https://images.unsplash.com/photo-1754476195695-9a39e974bfd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMG1hbiUyMHBvcnRyYWl0JTIwY29uZmlkZW50fGVufDF8fHx8MTc3NTYxOTkxMHww&ixlib=rb-4.1.0&q=80&w=1080",
      specialty: "HIIT & Functional Training",
      experience: "10+ Years",
      certifications: "ACE, CrossFit L2"
    },
    {
      name: "Emma Williams",
      role: "Nutrition & Fitness Coach",
      image: "https://images.unsplash.com/photo-1667029838838-87a4ccb6eff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc3NTYxOTkxMXww&ixlib=rb-4.1.0&q=80&w=1080",
      specialty: "Weight Loss & Nutrition",
      experience: "9+ Years",
      certifications: "RD, ISSA-CPT"
    }
  ];

  return (
    <div ref={ref} className="py-32 bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            Meet Our <span className="text-red-600">Trainers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Expert coaches dedicated to helping you reach your fitness goals
          </motion.p>
        </motion.div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 5,
                  z: 50,
                }}
                transition={{ duration: 0.4 }}
                className="relative bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img 
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  
                  {/* Floating Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {trainer.experience}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{trainer.name}</h3>
                  <p className="text-red-600 font-semibold mb-3">{trainer.role}</p>
                  <p className="text-gray-400 mb-4">{trainer.specialty}</p>
                  
                  {/* Certifications */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Award size={16} className="text-yellow-500" />
                    <span>{trainer.certifications}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-sm transition-colors"
                    >
                      <Calendar size={16} className="inline mr-2" />
                      Book Session
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                    >
                      <Heart size={16} className="text-red-500" />
                    </motion.button>
                  </div>
                </div>

                {/* 3D Border Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-red-600/0 rounded-2xl pointer-events-none"
                  whileHover={{ borderColor: 'rgba(220, 38, 38, 0.5)' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, rotateX: 10 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold text-xl transition-all shadow-2xl shadow-red-600/50"
            style={{ transformStyle: 'preserve-3d' }}
          >
            View All Trainers →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

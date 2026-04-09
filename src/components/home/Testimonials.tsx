import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Weight Loss Success",
      image: "https://images.unsplash.com/photo-1678648334232-6f2987e517a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGF0aGxldGUlMjBoYXBweSUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzU2MTk5MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      text: "I've lost 30 pounds in 4 months! The trainers here are incredibly supportive and knowledgeable. Best decision I ever made!",
      stats: "-30 lbs"
    },
    {
      name: "Mike Chen",
      role: "Strength Training",
      image: "https://images.unsplash.com/photo-1763844072520-e480cb2cec8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGF0aGxldGljJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1NjE5OTExfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      text: "The equipment is top-notch and the community is amazing. I've gained 15 pounds of muscle and feel stronger than ever.",
      stats: "+15 lbs Muscle"
    },
    {
      name: "Emily Rodriguez",
      role: "Fitness Enthusiast",
      image: "https://images.unsplash.com/photo-1667029838838-87a4ccb6eff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc3NTYxOTkxMXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      text: "The group classes are so much fun! I actually look forward to my workouts now. It's more than a gym, it's a family.",
      stats: "6 Months"
    }
  ];

  return (
    <div className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-600 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translateY(-100px)`
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
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
            Success <span className="text-red-600">Stories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Real transformations from real members
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
                transition={{ duration: 0.3 }}
                className="relative bg-zinc-900 p-8 rounded-2xl h-full flex flex-col"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 -right-4 bg-red-600 p-4 rounded-xl"
                >
                  <Quote size={24} />
                </motion.div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 + i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Star size={20} className="fill-yellow-500 text-yellow-500" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 flex-grow italic">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-zinc-900"
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    <motion.p 
                      className="text-red-600 font-bold text-sm"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {testimonial.stats}
                    </motion.p>
                  </div>
                </div>

                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-white/5 rounded-2xl" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Video Testimonial CTA */}
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
            Watch Video Testimonials →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
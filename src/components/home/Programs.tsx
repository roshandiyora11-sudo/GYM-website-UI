import { motion } from 'motion/react';
import { Dumbbell, Heart, Zap, Users } from 'lucide-react';

export function Programs() {
  const programs = [
    {
      icon: Dumbbell,
      title: "Strength Training",
      description: "Build muscle and increase power with our expert-led strength programs.",
      image: "https://images.unsplash.com/photo-1772450014622-1c209d012c2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2R5YnVpbGRpbmclMjBwb3dlcmxpZnRpbmclMjBiYXJiZWxsfGVufDF8fHx8MTc3NTYxOTkwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-red-600 to-orange-600"
    },
    {
      icon: Heart,
      title: "Cardio & HIIT",
      description: "Burn calories and improve endurance with high-intensity interval training.",
      image: "https://images.unsplash.com/photo-1773681823208-7f3657c0688f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjBydW5uaW5nJTIwY2FyZGlvfGVufDF8fHx8MTc3NTYxOTkwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Zap,
      title: "Yoga & Flexibility",
      description: "Enhance your flexibility and mental clarity with guided yoga sessions.",
      image: "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHBlYWNlZnVsfGVufDF8fHx8MTc3NTU0OTkwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Users,
      title: "Group Classes",
      description: "Stay motivated with energetic group workouts and community support.",
      image: "https://images.unsplash.com/photo-1761035190790-aa1a3472f7fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMGZpdG5lc3MlMjBjbGFzcyUyMGVuZXJneXxlbnwxfHx8fDE3NzU1MzIzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-green-600 to-emerald-600"
    }
  ];

  return (
    <div className="py-32 bg-zinc-900 text-white">
      <div className="container mx-auto px-4">
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
            Our <span className="text-red-600">Programs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover the perfect program to match your fitness goals and lifestyle
          </motion.p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 5,
                  z: 50,
                }}
                transition={{ duration: 0.3 }}
                className="relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${program.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${program.color} opacity-80 group-hover:opacity-90 transition-opacity`} />

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-end">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                  >
                    <program.icon size={48} className="text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                  <p className="text-white/90 mb-6">{program.description}</p>

                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white text-black rounded-lg font-semibold self-start transition-all"
                  >
                    Learn More →
                  </motion.button>
                </div>

                {/* 3D Effect Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/20 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
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
            className="px-10 py-5 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-xl transition-colors shadow-2xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            View Full Schedule
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
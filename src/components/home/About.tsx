import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Target, Users, Trophy } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const stats = [
    { icon: Users, value: "5000+", label: "Active Members", color: "text-red-600" },
    { icon: Trophy, value: "50+", label: "Expert Trainers", color: "text-yellow-500" },
    { icon: Target, value: "15", label: "Years Experience", color: "text-blue-500" }
  ];

  return (
    <div ref={ref} className="relative py-32 bg-zinc-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        style={{ x }}
        className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ x: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
      />

      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, rotateX: -20 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              About <span className="text-red-600">Powerhouse</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              We're not just a gym – we're a community dedicated to helping you achieve your fitness goals. 
              With state-of-the-art equipment, expert trainers, and a motivating atmosphere, we provide 
              everything you need to succeed.
            </motion.p>

            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Whether you're a beginner or a seasoned athlete, our personalized approach ensures 
              you get the results you deserve.
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 10,
                    z: 50,
                  }}
                  viewport={{ once: true }}
                  className="bg-zinc-900 p-6 rounded-xl text-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <stat.icon className={`${stat.color} mx-auto mb-2`} size={32} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1758875569352-9df9dc6537bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdvbWFuJTIwdHJhaW5pbmclMjB3ZWlnaHRzfGVufDF8fHx8MTc3NTYxOTkwOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fitness Training"
                className="w-full h-[600px] object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              animate={{ 
                y: [0, -10, 0],
                rotateZ: [0, 5, -5, 0]
              }}
              transition={{ 
                scale: { duration: 0.6, delay: 1 },
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                rotateZ: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
              className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-2xl shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-sm">Open Access</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
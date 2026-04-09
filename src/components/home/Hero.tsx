import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Dumbbell, ArrowDown } from 'lucide-react';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden bg-black">
      {/* Background Image with Parallax and Zoom Animation */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1761971975769-97e598bf526b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBpbnRlcmlvciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzU1NzgyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative h-full flex flex-col items-center justify-center text-white px-4"
      >
        {/* Animated Logo */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="mb-8"
        >
          <Dumbbell size={80} className="text-red-600" />
        </motion.div>

        {/* 3D Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold text-center mb-4"
          style={{
            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            transformStyle: 'preserve-3d',
          }}
        >
          ITALIYA
          <motion.span 
            className="block text-red-600"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            GYM
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-xl md:text-2xl text-gray-300 text-center mb-12 max-w-2xl"
        >
          Transform Your Body, Transform Your Life
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/register'}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-lg transition-colors"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Start Free Trial
          </motion.button>
          <motion.a
            href="#programs"
            whileHover={{ scale: 1.05, rotateY: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-white hover:bg-white hover:text-black rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            View Classes
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5 },
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
          className="absolute bottom-10"
        >
          <ArrowDown size={40} className="text-white/70" />
        </motion.div>
      </motion.div>
    </div>
  );
}
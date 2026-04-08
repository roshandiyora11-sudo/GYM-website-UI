import { motion, useScroll, useTransform } from 'motion/react';
import { useState } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.95)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(10px)']
  );

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Trainers", href: "#trainers" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <motion.nav
      style={{ 
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-white font-bold text-2xl"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Dumbbell size={32} className="text-red-600" />
            </motion.div>
            ITALIYA
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  color: '#dc2626',
                  y: -2,
                }}
                className="text-white hover:text-red-600 transition-colors font-medium"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Join Now
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4 py-6 space-y-4">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -50 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setIsOpen(false)}
              className="block text-white hover:text-red-600 transition-colors text-lg font-medium py-2"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
            transition={{ delay: 0.3 }}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Join Now
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
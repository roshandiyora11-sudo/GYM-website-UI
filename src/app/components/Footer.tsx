import { motion } from 'motion/react';
import { Dumbbell, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    "Quick Links": ["About Us", "Programs", "Pricing", "Trainers", "Contact"],
    "Programs": ["Strength Training", "Cardio & HIIT", "Yoga", "Group Classes", "Personal Training"],
    "Support": ["FAQ", "Terms & Conditions", "Privacy Policy", "Membership", "Cancellation Policy"]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Twitter, href: "#", color: "hover:text-sky-500" },
    { icon: Youtube, href: "#", color: "hover:text-red-500" }
  ];

  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Dumbbell size={400} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <Dumbbell size={40} className="text-red-600" />
                <span className="text-3xl font-bold">POWERHOUSE</span>
              </motion.div>
              <p className="text-gray-400 mb-6 max-w-md">
                Transform your body and mind at Powerhouse Gym. Join our community of fitness enthusiasts 
                and start your journey to a healthier, stronger you.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`bg-zinc-900 p-3 rounded-lg transition-colors ${social.color}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: '#dc2626' }}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-zinc-800 pt-12 mb-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-6">
              Get fitness tips, workout plans, and exclusive offers delivered to your inbox
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-zinc-900 border-2 border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-center md:text-left">
            © 2026 Powerhouse Gym. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <motion.a 
              href="#" 
              whileHover={{ color: '#dc2626', y: -2 }}
              className="hover:text-red-600 transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ color: '#dc2626', y: -2 }}
              className="hover:text-red-600 transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ color: '#dc2626', y: -2 }}
              className="hover:text-red-600 transition-colors"
            >
              Cookie Policy
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

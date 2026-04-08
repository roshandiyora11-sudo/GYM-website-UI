import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Fitness Street", "Downtown, NY 10001"],
      color: "text-red-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Sun: 6AM - 11PM"],
      color: "text-blue-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@powerhouse.gym", "support@powerhouse.gym"],
      color: "text-green-600"
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["24/7 Access", "For Premium Members"],
      color: "text-purple-600"
    }
  ];

  return (
    <div className="py-32 bg-black text-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
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
              initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              Get in <span className="text-red-600">Touch</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300"
            >
              Ready to start your fitness journey? Contact us today!
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -100, rotateY: -30 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      x: 10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-zinc-900 p-6 rounded-2xl flex items-start gap-4"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`${info.color} bg-zinc-800 p-4 rounded-xl`}
                    >
                      <info.icon size={28} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-400">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <motion.form
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900 p-8 rounded-2xl space-y-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: '#dc2626' }}
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 rounded-xl focus:outline-none focus:border-red-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: '#dc2626' }}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 rounded-xl focus:outline-none focus:border-red-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: '#dc2626' }}
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 rounded-xl focus:outline-none focus:border-red-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02, borderColor: '#dc2626' }}
                    rows={4}
                    placeholder="Tell us about your fitness goals..."
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 rounded-xl focus:outline-none focus:border-red-600 transition-all resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, rotateX: 10 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold text-lg shadow-2xl shadow-red-600/50"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </motion.div>
          </div>

          {/* Map Placeholder with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 2 }}
              className="bg-zinc-900 rounded-2xl overflow-hidden h-[400px] relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-purple-600/20 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center"
                >
                  <MapPin size={64} className="mx-auto mb-4 text-red-600" />
                  <p className="text-2xl font-bold">Interactive Map</p>
                  <p className="text-gray-400 mt-2">123 Fitness Street, Downtown, NY 10001</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

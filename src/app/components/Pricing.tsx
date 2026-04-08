import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      description: "Perfect for beginners",
      features: [
        "Access to gym equipment",
        "Locker room access",
        "Free fitness assessment",
        "Basic workout plan"
      ],
      popular: false,
      color: "from-gray-700 to-gray-800"
    },
    {
      name: "Premium",
      price: "$59",
      period: "/month",
      description: "Most popular choice",
      features: [
        "All Basic features",
        "Unlimited group classes",
        "Personal trainer (2x/month)",
        "Nutrition consultation",
        "Free guest passes (4x/month)",
        "Access to sauna & spa"
      ],
      popular: true,
      color: "from-red-600 to-orange-600"
    },
    {
      name: "Elite",
      price: "$99",
      period: "/month",
      description: "For serious athletes",
      features: [
        "All Premium features",
        "Personal trainer (8x/month)",
        "Custom meal plans",
        "Priority booking",
        "24/7 gym access",
        "Free supplements",
        "Recovery massage (2x/month)"
      ],
      popular: false,
      color: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="py-32 bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
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
            initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            Membership <span className="text-red-600">Plans</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Choose the perfect plan to kickstart your fitness journey
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${plan.popular ? 'md:-mt-8 md:mb-0' : ''}`}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full font-bold text-sm z-20"
                >
                  MOST POPULAR
                </motion.div>
              )}

              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: plan.popular ? 0 : 5,
                  z: 50,
                }}
                transition={{ duration: 0.3 }}
                className={`relative h-full bg-gradient-to-br ${plan.color} p-8 rounded-3xl ${
                  plan.popular ? 'shadow-2xl shadow-red-600/50' : 'shadow-xl'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Content */}
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/80 mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <motion.span 
                      className="text-6xl font-bold"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {plan.price}
                    </motion.span>
                    <span className="text-xl text-white/80">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + featureIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check size={20} className="text-white mt-1 flex-shrink-0" />
                        </motion.div>
                        <span className="text-white/90">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      plan.popular 
                        ? 'bg-white text-red-600 hover:bg-gray-100' 
                        : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    Choose Plan
                  </motion.button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-sm" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-lg"
          >
            ✓ 30-Day Money Back Guarantee • No Commitment Required
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, ChefHat, Truck, Utensils } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const steps = [
  {
    icon: ShoppingCart,
    title: 'Browse & Select',
    description: 'Choose from our delicious menu of authentic biryani dishes crafted with premium ingredients',
    color: 'from-orange-500 to-red-500',
    iconBg: 'bg-gradient-to-br from-orange-50 to-orange-100',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    step: '01'
  },
  {
    icon: ChefHat,
    title: 'We Prepare',
    description: 'Our expert chefs craft your meal with premium ingredients and authentic spices',
    color: 'from-green-500 to-emerald-500',
    iconBg: 'bg-gradient-to-br from-green-50 to-green-100',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200',
    step: '02'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Your order arrives hot and fresh at your doorstep within 30-45 minutes',
    color: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    step: '03'
  },
  {
    icon: Utensils,
    title: 'Enjoy!',
    description: 'Savor every bite of your delicious, authentic biryani made with love',
    color: 'from-purple-500 to-pink-500',
    iconBg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    step: '04'
  }
];

export const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Elegant background decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground font-heading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg font-body max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From your order to your plate in 4 simple steps
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative max-w-7xl mx-auto"
        >
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-200 via-green-200 via-blue-200 to-purple-200"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -15, scale: 1.02 }}
              className="relative group"
            >
              {/* Step number badge */}
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 250 }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-2xl font-heading`}>
                  {step.step}
                </div>
              </motion.div>

              <div className={`bg-white ${step.iconBg} rounded-3xl p-8 pt-14 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${step.borderColor} relative overflow-hidden h-full flex flex-col`}>
                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full" style={{
                  background: `linear-gradient(135deg, currentColor 0%, transparent 70%)`,
                  color: step.iconColor.replace('text-', '')
                }} />

                {/* Icon container */}
                <motion.div
                  className="mb-6 relative mx-auto"
                  whileHover={{ rotate: [0, -8, 8, -8, 0], scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 inline-block shadow-lg">
                    <step.icon className={`w-12 h-12 ${step.iconColor}`} strokeWidth={2.5} />
                  </div>

                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`}
                  />
                </motion.div>

                {/* Content */}
                <div className="text-center flex-1 flex flex-col">
                  <h3 className={`text-2xl font-bold mb-4 text-foreground font-heading`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-body text-base">
                    {step.description}
                  </p>
                </div>

                {/* Bottom gradient bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Arrow indicator for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-30">
                    <motion.div
                      animate={{
                        x: [0, 8, 0]
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-3xl text-primary/40"
                    >
                      →
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1 }}
          className="text-center mt-20"
        >
          <motion.button
            className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 text-white font-bold text-lg px-14 py-6 rounded-2xl shadow-2xl hover:shadow-primary/40 transition-all font-heading"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Order
            <motion.span
              className="inline-block ml-3 text-xl"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

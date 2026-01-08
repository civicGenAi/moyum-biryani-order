import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Clock, Truck, Award, Heart, Leaf } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const badges = [
  {
    icon: Shield,
    title: '100% Halal',
    description: 'Certified & Pure',
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    icon: Clock,
    title: 'Fresh Daily',
    description: 'Made to Order',
    color: 'text-primary',
    bg: 'bg-orange-50'
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Orders Over 20K',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    icon: Award,
    title: 'Top Rated',
    description: '4.8★ on Reviews',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50'
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Authentic Recipe',
    color: 'text-red-600',
    bg: 'bg-red-50'
  },
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'Premium Quality',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  }
];

export const TrustBadges = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group"
            >
              <div className={`${badge.bg} rounded-2xl p-6 text-center transition-all duration-300 shadow-md hover:shadow-xl border-2 border-transparent hover:border-${badge.color.split('-')[1]}-200`}>
                <motion.div
                  className="inline-block"
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                >
                  <badge.icon className={`w-10 h-10 md:w-12 md:h-12 ${badge.color} mx-auto mb-3`} strokeWidth={2} />
                </motion.div>
                <h3 className={`font-bold text-sm md:text-base ${badge.color} mb-1`}>
                  {badge.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const Counter = ({ target, duration = 2, suffix = '', prefix = '' }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export const LiveStats = () => {
  const [todayOrders, setTodayOrders] = useState(127);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  // Simulate live order updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayOrders(prev => prev + 1);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      value: todayOrders,
      label: 'Orders Today',
      color: 'from-orange-500 to-red-500',
      iconColor: 'text-orange-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
      live: true
    },
    {
      icon: Users,
      value: 1250,
      suffix: '+',
      label: 'Happy Customers',
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Clock,
      value: 35,
      label: 'Avg. Delivery (min)',
      color: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    },
    {
      icon: CheckCircle,
      value: 99,
      suffix: '%',
      label: 'On-Time Rate',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-cream-50 to-background relative overflow-hidden">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0"
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(234, 88, 12, 0.08) 1px, transparent 0)`,
               backgroundSize: '50px 50px'
             }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground font-heading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Live Performance
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg font-body max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Real-time updates from our kitchen to your doorstep
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative"
            >
              <div className={`${stat.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${stat.borderColor} relative overflow-hidden`}>
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-bl-full" style={{
                  background: `linear-gradient(135deg, currentColor 0%, transparent 70%)`,
                  color: stat.iconColor.replace('text-', '')
                }} />

                {/* Live indicator */}
                {stat.live && (
                  <motion.div
                    className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.span
                      className="w-2.5 h-2.5 bg-red-500 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs font-bold text-red-500 font-body">LIVE</span>
                  </motion.div>
                )}

                {/* Icon container */}
                <motion.div
                  className="mb-6 relative"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 inline-block shadow-lg">
                    <stat.icon className={`w-10 h-10 ${stat.iconColor}`} strokeWidth={2} />
                  </div>
                </motion.div>

                {/* Counter value */}
                <motion.div
                  className={`text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent relative z-10 font-heading`}
                  key={stat.live ? todayOrders : stat.value}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Counter
                    target={stat.live ? todayOrders : stat.value}
                    suffix={stat.suffix}
                  />
                </motion.div>

                {/* Label */}
                <p className="text-base font-semibold text-foreground/80 relative z-10 font-body tracking-wide">
                  {stat.label}
                </p>

                {/* Bottom gradient bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent activity banner - enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/10 via-orange-100/50 to-primary/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
            <div className="flex items-center justify-center gap-4 text-center flex-wrap">
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-3xl"
              >
                🔥
              </motion.div>
              <p className="text-base md:text-lg font-semibold text-foreground font-body">
                <span className="text-primary font-bold font-heading">Sarah M.</span> just ordered{' '}
                <span className="font-bold">Chicken Biryani Family Pack</span>
              </p>
              <span className="text-sm text-muted-foreground bg-white/60 px-3 py-1 rounded-full font-body">
                2 minutes ago
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

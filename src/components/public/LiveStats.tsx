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
      bgColor: 'bg-orange-50',
      live: true
    },
    {
      icon: Users,
      value: 1250,
      suffix: '+',
      label: 'Happy Customers',
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Clock,
      value: 35,
      label: 'Avg. Delivery (min)',
      color: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: CheckCircle,
      value: 99,
      suffix: '%',
      label: 'On-Time Rate',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-foreground">
            Live Performance
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time updates from our kitchen to your doorstep
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className={`${stat.bgColor} rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 relative overflow-hidden`}>
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Live indicator */}
                {stat.live && (
                  <motion.div
                    className="absolute top-3 right-3 flex items-center gap-1.5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-red-500">LIVE</span>
                  </motion.div>
                )}

                {/* Icon */}
                <motion.div
                  className={`${stat.bgColor} rounded-full p-4 inline-block mb-4 relative z-10`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.iconColor}`} strokeWidth={2.5} />
                </motion.div>

                {/* Counter */}
                <motion.div
                  className={`text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent relative z-10`}
                  key={stat.live ? todayOrders : stat.value}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Counter
                    target={stat.live ? todayOrders : stat.value}
                    suffix={stat.suffix}
                  />
                </motion.div>

                {/* Label */}
                <p className="text-sm md:text-base font-semibold text-muted-foreground relative z-10">
                  {stat.label}
                </p>

                {/* Decorative circles */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full opacity-10 blur-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent activity banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-6 backdrop-blur-sm border border-primary/20"
        >
          <div className="flex items-center justify-center gap-3 text-center flex-wrap">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥
            </motion.div>
            <p className="text-sm md:text-base font-semibold text-foreground">
              <span className="text-primary font-bold">Sarah M.</span> just ordered{' '}
              <span className="font-bold">Chicken Biryani Family Pack</span> · 2 minutes ago
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

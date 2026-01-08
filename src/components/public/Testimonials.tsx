import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Fatima Hassan',
    role: 'Regular Customer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
    rating: 5,
    text: 'The best biryani in town! The flavors are authentic and remind me of home. The chicken is always tender and the spices are perfectly balanced. Delivery is always on time!',
    date: '2 days ago'
  },
  {
    id: 2,
    name: 'Ahmed Mohamed',
    role: 'Food Blogger',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    rating: 5,
    text: 'MOYUM has set the standard for biryani in Dar es Salaam. Every grain of rice is infused with flavor. The portion sizes are generous and the presentation is beautiful!',
    date: '5 days ago'
  },
  {
    id: 3,
    name: 'Zainab Ali',
    role: 'First-time Buyer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab',
    rating: 5,
    text: 'I was skeptical at first, but this exceeded all expectations! The aroma when I opened the package was incredible. Will definitely be ordering again. Highly recommended!',
    date: '1 week ago'
  },
  {
    id: 4,
    name: 'Ibrahim Juma',
    role: 'Regular Customer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim',
    rating: 5,
    text: 'Fast delivery, hot food, and amazing taste! The quality is consistent every single time. This is my go-to place for biryani. Worth every shilling!',
    date: '2 weeks ago'
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Quote className="w-12 h-12 text-primary mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-orange-600 to-accent bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="relative h-[400px] md:h-[350px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0"
              >
                <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/10 h-full flex flex-col justify-between">
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                      >
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg md:text-xl text-foreground/90 text-center leading-relaxed mb-8 italic">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <motion.img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full border-4 border-primary/20 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-lg text-foreground">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        {testimonials[currentIndex].date}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-all shadow-lg"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className="group relative"
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? 'bg-primary scale-100' : 'bg-muted-foreground/30 scale-75'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30 blur-sm"
                      animate={{ scale: [1, 1.8, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-all shadow-lg"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Trust stats below testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mt-16"
        >
          {[
            { value: '500+', label: 'Happy Customers' },
            { value: '4.8★', label: 'Average Rating' },
            { value: '99%', label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-extrabold text-primary mb-2"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

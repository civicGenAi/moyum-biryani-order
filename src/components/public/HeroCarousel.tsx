import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import birianiPoster from '@/assets/biriani-poster.jpeg';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    image: birianiPoster,
    title: 'MOYUM',
    subtitle: 'Chicken Biriani',
    description: 'Rich Taste • Authentic Flavor',
    cta: 'Order Now'
  },
  {
    id: 2,
    image: birianiPoster,
    title: 'TODAY\'S SPECIAL',
    subtitle: 'Premium Biryani Bowl',
    description: 'Handpicked Spices • Tender Meat',
    cta: 'Try Today'
  },
  {
    id: 3,
    image: birianiPoster,
    title: 'FEAST COMBO',
    subtitle: 'Family Pack Deal',
    description: 'Best Value • Feeds 4-6 People',
    cta: 'Get Deal'
  }
];

interface HeroCarouselProps {
  onOrderClick: () => void;
}

export const HeroCarousel = ({ onOrderClick }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Parallax effect on scroll
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent"
              animate={{
                background: [
                  'linear-gradient(to top, rgba(51, 32, 19, 0.95) 0%, rgba(51, 32, 19, 0.6) 50%, rgba(51, 32, 19, 0.3) 100%)',
                  'linear-gradient(to top, rgba(51, 32, 19, 0.9) 0%, rgba(51, 32, 19, 0.65) 50%, rgba(51, 32, 19, 0.35) 100%)',
                  'linear-gradient(to top, rgba(51, 32, 19, 0.95) 0%, rgba(51, 32, 19, 0.6) 50%, rgba(51, 32, 19, 0.3) 100%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-10 text-primary/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-10 text-primary/20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center"
        style={{ opacity }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Title with stagger animation */}
            <motion.h2
              className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {slides[currentSlide].title}
            </motion.h2>

            <motion.h3
              className="text-3xl md:text-4xl font-bold text-primary drop-shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {slides[currentSlide].subtitle}
            </motion.h3>

            <motion.p
              className="text-xl text-white/95 font-medium drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* CTA Button with pulse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button
                size="lg"
                onClick={onOrderClick}
                className="relative bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl px-12 py-7 rounded-2xl shadow-2xl hover:shadow-primary/50 transition-all overflow-hidden group"
              >
                {/* Button shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center gap-2">
                  {slides[currentSlide].cta}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <motion.div
          className="absolute bottom-8 flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative"
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-primary scale-100' : 'bg-white/50 scale-75'
                }`}
                whileHover={{ scale: 1.2 }}
              />
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/30 blur-sm"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
        <motion.button
          onClick={prevSlide}
          className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all shadow-lg"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all shadow-lg"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </section>
  );
};

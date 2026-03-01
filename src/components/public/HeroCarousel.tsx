import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import birianiPoster from '@/assets/biriani-poster.jpeg';
import { useTheme } from '@/contexts/ThemeContext';

const slides = [
  { id: 1, image: birianiPoster, title: 'MOYUM', subtitle: 'Chicken Biriani', description: 'Rich Taste • Authentic Flavor', cta: 'Order Now' },
  { id: 2, image: birianiPoster, title: "TODAY'S SPECIAL", subtitle: 'Premium Biryani Bowl', description: 'Handpicked Spices • Tender Meat', cta: 'Try Today' },
  { id: 3, image: birianiPoster, title: 'FEAST COMBO', subtitle: 'Family Pack Deal', description: 'Best Value • Feeds 4-6 People', cta: 'Get Deal' },
];

interface HeroCarouselProps { onOrderClick: () => void; }

export const HeroCarousel = ({ onOrderClick }: HeroCarouselProps) => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const { heroStyle } = theme.layout;
  const { borderRadius } = theme.layout;

  useEffect(() => {
    const timer = setInterval(() => { setDirection(1); setCurrentSlide(p => (p + 1) % slides.length); }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => { setDirection(1); setCurrentSlide(p => (p + 1) % slides.length); };
  const prevSlide = () => { setDirection(-1); setCurrentSlide(p => (p - 1 + slides.length) % slides.length); };

  const slide = slides[currentSlide];

  // ─── WARM COMFORT (Sweet Bakery / Fun Kids) ───────────────────────────────
  if (heroStyle === 'warm-comfort') {
    return (
      <section className="relative overflow-hidden" style={{ minHeight: '500px', background: `radial-gradient(ellipse at center, ${theme.colors.highlight}55 0%, ${theme.colors.background} 70%)` }}>
        {/* Floating decorative circles */}
        {['top-10 left-10', 'top-20 right-20', 'bottom-20 left-1/4', 'bottom-10 right-10'].map((pos, i) => (
          <motion.div key={i} className={`absolute ${pos} rounded-full opacity-30`}
            style={{ width: `${60 + i * 30}px`, height: `${60 + i * 30}px`, backgroundColor: [theme.colors.highlight, theme.colors.accent, theme.colors.primary, theme.colors.highlight][i] }}
            animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center z-10">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }} className="space-y-5">
              <motion.h1 className="text-5xl md:text-7xl font-extrabold leading-tight"
                style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}>
                {slide.title}
              </motion.h1>
              <p className="text-2xl md:text-3xl font-semibold" style={{ color: theme.colors.primary, fontFamily: `var(--theme-font-display)` }}>{slide.subtitle}</p>
              <p className="text-lg" style={{ color: theme.colors.textMuted }}>{slide.description}</p>
              <Button size="lg" onClick={onOrderClick}
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground, borderRadius, fontFamily: `var(--theme-font-display)` }}
                className="font-bold text-xl px-12 py-7 shadow-2xl hover:opacity-90 transition-all">
                {slide.cta} →
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
        <SlideControls currentSlide={currentSlide} total={slides.length} onPrev={prevSlide} onNext={nextSlide} onGo={setCurrentSlide} primaryColor={theme.colors.primary} />
      </section>
    );
  }

  // ─── STREET ENERGY (Street Fiesta) ────────────────────────────────────────
  if (heroStyle === 'street-energy') {
    return (
      <section className="relative overflow-hidden" style={{ minHeight: '520px', backgroundColor: theme.colors.background }}>
        {/* Diagonal accent stripe */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-3/4 h-full opacity-20" style={{ background: `linear-gradient(135deg, transparent 40%, ${theme.colors.accent} 41%, ${theme.colors.accent} 44%, transparent 45%)` }} />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-28 z-10">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.3 }}>
              <motion.h1 className="text-6xl md:text-9xl font-black uppercase leading-none mb-3"
                style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.primary }}>
                {slide.title}
              </motion.h1>
              <p className="text-2xl md:text-3xl font-bold uppercase mb-2" style={{ color: theme.colors.accent, fontFamily: `var(--theme-font-display)` }}>{slide.subtitle}</p>
              <p className="text-base mb-8" style={{ color: theme.colors.textMuted }}>{slide.description}</p>
              <Button size="lg" onClick={onOrderClick}
                style={{ backgroundColor: theme.colors.accent, color: '#000', borderRadius, fontFamily: `var(--theme-font-display)` }}
                className="font-black text-xl px-12 py-7 uppercase tracking-wide hover:opacity-90 transition-all">
                {slide.cta} ⚡
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
        <SlideControls currentSlide={currentSlide} total={slides.length} onPrev={prevSlide} onNext={nextSlide} onGo={setCurrentSlide} primaryColor={theme.colors.primary} />
      </section>
    );
  }

  // ─── MINIMAL FRESH (Fresh & Healthy) ──────────────────────────────────────
  if (heroStyle === 'minimal-fresh') {
    return (
      <section className="relative overflow-hidden" style={{ minHeight: '480px', backgroundColor: theme.colors.background }}>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at right, ${theme.colors.accent}, transparent 70%)` }} />
        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center z-10">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full" style={{ backgroundColor: theme.colors.accent + '33', color: theme.colors.primary }}>🌿 Clean & Fresh</span>
              <h1 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}>{slide.title}</h1>
              <p className="text-xl font-medium" style={{ color: theme.colors.primary }}>{slide.subtitle}</p>
              <p className="text-base" style={{ color: theme.colors.textMuted }}>{slide.description}</p>
              <Button size="lg" onClick={onOrderClick}
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground, borderRadius }}
                className="font-bold text-lg px-10 py-6 hover:opacity-90 transition-all">
                {slide.cta}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
        <SlideControls currentSlide={currentSlide} total={slides.length} onPrev={prevSlide} onNext={nextSlide} onGo={setCurrentSlide} primaryColor={theme.colors.primary} />
      </section>
    );
  }

  // ─── BOLD NEON (Asian Kitchen) ─────────────────────────────────────────────
  if (heroStyle === 'bold-neon') {
    return (
      <section className="relative overflow-hidden" style={{ minHeight: '500px', backgroundColor: theme.colors.background }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${theme.colors.primary}11 0%, transparent 50%, ${theme.colors.accent}11 100%)` }} />
        {/* Red accent lines */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: theme.colors.primary }} />
        <div className="absolute right-0 top-0 bottom-0 w-1" style={{ backgroundColor: theme.colors.primary }} />
        <div className="relative container mx-auto px-8 py-20 md:py-28 text-center z-10">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.25 }} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black" style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}>{slide.title}</h1>
              <div className="w-16 h-1 mx-auto" style={{ backgroundColor: theme.colors.primary }} />
              <p className="text-xl font-bold" style={{ color: theme.colors.primary }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>{slide.description}</p>
              <Button size="lg" onClick={onOrderClick}
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground, borderRadius: '0px' }}
                className="font-bold text-lg px-12 py-6 uppercase tracking-widest hover:opacity-90 transition-all">
                {slide.cta}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
        <SlideControls currentSlide={currentSlide} total={slides.length} onPrev={prevSlide} onNext={nextSlide} onGo={setCurrentSlide} primaryColor={theme.colors.primary} />
      </section>
    );
  }

  // ─── RUSTIC HANDMADE (Home Kitchen) ───────────────────────────────────────
  if (heroStyle === 'rustic-handmade') {
    return (
      <section className="relative overflow-hidden" style={{ minHeight: '480px', backgroundColor: theme.colors.background }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center z-10">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="space-y-5">
              <p className="text-sm tracking-widest uppercase font-bold" style={{ color: theme.colors.accent }}>🫕 Homemade with Love</p>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: theme.colors.primary, fontFamily: `var(--theme-font-display)` }}>{slide.subtitle}</p>
              <p className="text-base italic" style={{ color: theme.colors.textMuted }}>{slide.description}</p>
              <Button size="lg" onClick={onOrderClick}
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground, borderRadius }}
                className="font-bold text-lg px-10 py-6 hover:opacity-90 transition-all">
                {slide.cta}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
        <SlideControls currentSlide={currentSlide} total={slides.length} onPrev={prevSlide} onNext={nextSlide} onGo={setCurrentSlide} primaryColor={theme.colors.primary} />
      </section>
    );
  }

  // ─── FULLSCREEN APPETITE (default — image background) ─────────────────────
  return (
    <section className="relative h-[560px] md:h-[660px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div key={currentSlide} custom={direction}
          variants={{ enter: (d: number) => ({ x: d > 0 ? 1000 : -1000, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: d < 0 ? 1000 : -1000, opacity: 0 }) }}
          initial="enter" animate="center" exit="exit"
          transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.5 } }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${theme.colors.text}EE 0%, ${theme.colors.text}88 50%, ${theme.colors.text}44 100%)` }} />
        </motion.div>
      </AnimatePresence>
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center z-10">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6 }} className="space-y-5">
            <motion.h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl"
              style={{ fontFamily: `var(--theme-font-display)` }}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              {slide.title}
            </motion.h1>
            <motion.p className="text-2xl md:text-3xl font-bold drop-shadow-lg"
              style={{ color: theme.colors.primary, fontFamily: `var(--theme-font-display)` }}
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
              {slide.subtitle}
            </motion.p>
            <motion.p className="text-lg text-white/90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>{slide.description}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <Button size="lg" onClick={onOrderClick}
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground, borderRadius }}
                className="font-bold text-xl px-12 py-7 shadow-2xl hover:opacity-90 transition-all overflow-hidden relative group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">{slide.cta} →</span>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-8 flex gap-3">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)}>
              <motion.div className="w-3 h-3 rounded-full transition-all" style={{ backgroundColor: i === currentSlide ? theme.colors.primary : 'rgba(255,255,255,0.4)', transform: i === currentSlide ? 'scale(1.2)' : 'scale(0.8)' }} />
            </button>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
        <motion.button onClick={prevSlide} className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><ChevronLeft className="w-6 h-6" /></motion.button>
        <motion.button onClick={nextSlide} className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><ChevronRight className="w-6 h-6" /></motion.button>
      </div>
    </section>
  );
};

// Shared slide controls
const SlideControls = ({ currentSlide, total, onPrev, onNext, onGo, primaryColor }: {
  currentSlide: number; total: number; onPrev: () => void; onNext: () => void; onGo: (i: number) => void; primaryColor: string;
}) => (
  <>
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => onGo(i)}>
          <div className="w-2.5 h-2.5 rounded-full transition-all" style={{ backgroundColor: i === currentSlide ? primaryColor : `${primaryColor}44`, transform: i === currentSlide ? 'scale(1.3)' : 'scale(1)' }} />
        </button>
      ))}
    </div>
    <button onClick={onPrev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full" style={{ backgroundColor: `${primaryColor}33`, color: primaryColor }}><ChevronLeft className="w-5 h-5" /></button>
    <button onClick={onNext} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full" style={{ backgroundColor: `${primaryColor}33`, color: primaryColor }}><ChevronRight className="w-5 h-5" /></button>
  </>
);

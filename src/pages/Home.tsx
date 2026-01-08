import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/public/Header';
import { HeroCarousel } from '@/components/public/HeroCarousel';
import { TrustBadges } from '@/components/public/TrustBadges';
import { MenuSection } from '@/components/public/MenuSection';
import { HowItWorks } from '@/components/public/HowItWorks';
import { LiveStats } from '@/components/public/LiveStats';
import { Testimonials } from '@/components/public/Testimonials';
import { Footer } from '@/components/public/Footer';
import { WhatsAppButton } from '@/components/public/WhatsAppButton';
import { CartSheet } from '@/components/public/CartSheet';
import { BottomNav } from '@/components/public/BottomNav';

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background pb-20 md:pb-0"
    >
      <Header onCartClick={() => setCartOpen(true)} />
      <HeroCarousel onOrderClick={scrollToMenu} />
      <TrustBadges />
      <LiveStats />
      <MenuSection />
      <HowItWorks />
      <Testimonials />
      <Footer />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
      <WhatsAppButton />
    </motion.div>
  );
};

export default Home;

import { useState } from 'react';
import { Header } from '@/components/public/Header';
import { HeroSection } from '@/components/public/HeroSection';
import { MenuSection } from '@/components/public/MenuSection';
import { CartSheet } from '@/components/public/CartSheet';
import { BottomNav } from '@/components/public/BottomNav';

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header onCartClick={() => setCartOpen(true)} />
      <HeroSection onOrderClick={scrollToMenu} />
      <MenuSection />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default Home;

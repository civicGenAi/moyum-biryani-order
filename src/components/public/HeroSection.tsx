import { Button } from '@/components/ui/button';
import birianiPoster from '@/assets/biriani-poster.jpeg';

interface HeroSectionProps {
  onOrderClick: () => void;
}

export const HeroSection = ({ onOrderClick }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={birianiPoster} 
          alt="Delicious Chicken Biriani" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/60 to-secondary/30" />
      </div>
      
      <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          MOYUM
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          Chicken Biriani
        </h3>
        <p className="text-lg text-white/90 mb-8 font-medium">
          Rich Taste • Authentic Flavor
        </p>
        <Button 
          size="lg" 
          onClick={onOrderClick}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Order Now
        </Button>
      </div>
    </section>
  );
};

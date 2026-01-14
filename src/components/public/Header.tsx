import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useBranch } from '@/contexts/BranchContext';
import { BranchSelector } from './BranchSelector';
import { MobileBranchSelector } from './MobileBranchSelector';
import logo from '@/assets/logo.jpeg';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onCartClick: () => void;
  onMenuToggle?: () => void;
}

export const Header = ({ onCartClick, onMenuToggle }: HeaderProps) => {
  const { itemCount } = useCart();
  const { selectedBranch } = useBranch();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Dynamic tagline based on branch categories
  const getTagline = () => {
    if (!selectedBranch) return 'Chicken Biryani';
    const hasCakes = selectedBranch.categories.includes('cakes');
    const hasBiryani = selectedBranch.categories.includes('biryani');
    if (hasCakes && hasBiryani) return 'Biryani & Cakes';
    if (hasCakes) return 'Premium Cakes';
    return 'Chicken Biryani';
  };

  // Dynamic search placeholder
  const getSearchPlaceholder = () => {
    if (!selectedBranch) return 'Search menu...';
    const hasCakes = selectedBranch.categories.includes('cakes');
    const hasBiryani = selectedBranch.categories.includes('biryani');
    if (hasCakes && hasBiryani) return 'Search biryani, cakes...';
    if (hasCakes) return 'Search cakes...';
    return 'Search for biryani...';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Mobile Location Bar */}
      <div className="md:hidden bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center">
          <MobileBranchSelector />
        </div>
      </div>

      {/* Main Header */}
      <motion.div
        className={`bg-card/95 backdrop-blur-xl border-b border-border transition-all duration-300 ${
          scrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
        style={{
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.1)' : undefined
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img
                src={logo}
                alt="MOYUM"
                className="h-10 w-10 md:h-12 md:w-12 rounded-xl object-cover shadow-md"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <div>
                <motion.h1
                  className="text-lg md:text-xl font-extrabold text-secondary group-hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  MOYUM
                </motion.h1>
                <p className="text-[10px] md:text-xs text-muted-foreground">{getTagline()}</p>
              </div>
            </Link>

            {/* Desktop Search & Location */}
            <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={getSearchPlaceholder()}
                  className="pl-10 pr-4 bg-muted/50 border-muted-foreground/20 focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <BranchSelector />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 md:h-10 md:w-10"
                  onClick={onCartClick}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <AnimatePresence>
                    {itemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
                      >
                        {itemCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              {/* Menu Toggle */}
              {onMenuToggle && (
                <Button variant="ghost" size="icon" onClick={onMenuToggle} className="md:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden pb-3"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={getSearchPlaceholder()}
                    className="pl-10 pr-10 bg-muted/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
};

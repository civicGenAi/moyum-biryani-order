import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import logo from '@/assets/logo.jpeg';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onCartClick: () => void;
  onMenuToggle?: () => void;
}

export const Header = ({ onCartClick, onMenuToggle }: HeaderProps) => {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="MOYUM" className="h-10 w-10 rounded-full object-cover" />
          <div>
            <h1 className="text-lg font-bold text-secondary">MOYUM</h1>
            <p className="text-xs text-muted-foreground">Chicken Biriani</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </Button>
          {onMenuToggle && (
            <Button variant="ghost" size="icon" onClick={onMenuToggle} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

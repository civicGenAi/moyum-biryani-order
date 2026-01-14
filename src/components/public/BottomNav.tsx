import { Home, UtensilsCrossed, ShoppingCart, ClipboardList, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link, useLocation } from 'react-router-dom';

interface BottomNavProps {
  onCartClick: () => void;
}

export const BottomNav = ({ onCartClick }: BottomNavProps) => {
  const { itemCount } = useCart();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: UtensilsCrossed, label: 'Menu', path: '/menu' },
    { icon: ShoppingCart, label: 'Cart', path: 'cart', isCart: true },
    { icon: ClipboardList, label: 'Orders', path: '/orders' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, path, isCart }) => (
          isCart ? (
            <button
              key={label}
              onClick={onCartClick}
              className="flex flex-col items-center gap-1 p-2 relative text-muted-foreground"
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-[10px]">{label}</span>
            </button>
          ) : (
            <Link
              key={label}
              to={path}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                isActive(path) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px]">{label}</span>
            </Link>
          )
        ))}
      </div>
    </nav>
  );
};

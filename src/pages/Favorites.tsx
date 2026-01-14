import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Trash2, ShoppingCart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { menuItems } from '@/data/menuItems';

interface FavoriteItem {
  id: string;
  menuItemId: string;
  addedAt: Date;
}

const Favorites = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const { addItem } = useCart();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    { id: '1', menuItemId: 'biryani-1', addedAt: new Date() },
    { id: '2', menuItemId: 'chocolate-cake', addedAt: new Date() },
    { id: '3', menuItemId: 'vanilla-cake', addedAt: new Date() },
  ]);

  const handleRemove = (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id));
    toast.success('Removed from favorites');
  };

  const handleAddToCart = (menuItemId: string) => {
    const item = menuItems.find(m => m.id === menuItemId);
    if (item) {
      addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
      toast.success(`${item.name} added to cart`);
    }
  };

  const getFavoriteItem = (menuItemId: string) => {
    return menuItems.find(m => m.id === menuItemId);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold font-heading">Favorites</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {favorites.map((fav, index) => {
            const item = getFavoriteItem(fav.menuItemId);
            if (!item) return null;
            
            return (
              <motion.div
                key={fav.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex">
                    <div 
                      className="w-24 h-24 bg-cover bg-center flex-shrink-0 cursor-pointer"
                      style={{ backgroundImage: `url(${item.image})` }}
                      onClick={() => navigate(`/menu/${item.id}`)}
                    />
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <h3 
                          className="font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                          onClick={() => navigate(`/menu/${item.id}`)}
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                        <p className="text-primary font-bold mt-1">TZS {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2 p-2">
                      <Button 
                        size="icon"
                        variant="default"
                        onClick={() => handleAddToCart(item.id)}
                        className="h-9 w-9"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemove(fav.id)}
                        className="h-9 w-9 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {favorites.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-4">No favorites yet</p>
            <Button onClick={() => navigate('/menu')} className="gap-2">
              <Package className="h-4 w-4" />
              Browse Menu
            </Button>
          </div>
        )}
      </div>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default Favorites;

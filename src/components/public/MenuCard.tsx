import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/data/menuItems';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const formatPrice = (price: number) => {
    return `TZS ${price.toLocaleString()}`;
  };

  return (
    <Card className="overflow-hidden bg-card border-0 shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-40 object-cover"
        />
        {item.isSpecial && (
          <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-lg">
            Today's Special
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{formatPrice(item.price)}</span>
          
          {quantity === 0 ? (
            <Button 
              size="sm" 
              onClick={handleAdd}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="outline" 
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-bold w-6 text-center">{quantity}</span>
              <Button 
                size="icon" 
                className="h-8 w-8 bg-primary hover:bg-primary/90"
                onClick={() => updateQuantity(item.id, quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

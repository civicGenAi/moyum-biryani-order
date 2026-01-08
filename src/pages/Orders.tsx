import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/public/BottomNav';

interface Order {
  orderNumber: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: string;
  createdAt: string;
}

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('moyum-orders') || '[]');
    setOrders(storedOrders.reverse());
  }, []);

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'preparing': return 'bg-blue-500';
      case 'ready': return 'bg-accent';
      case 'completed': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">My Orders</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">No orders yet</p>
            <Button onClick={() => navigate('/')} className="mt-4 bg-primary hover:bg-primary/90">
              Order Now
            </Button>
          </div>
        ) : (
          orders.map(order => (
            <Card key={order.orderNumber} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-sm">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <Badge className={`${getStatusColor(order.status)} text-white capitalize`}>
                  {order.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
              </div>
              <div className="font-bold text-primary">{formatPrice(order.total)}</div>
            </Card>
          ))
        )}
      </div>

      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default Orders;

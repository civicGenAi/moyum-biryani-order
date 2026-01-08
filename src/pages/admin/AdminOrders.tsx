import { useState, useEffect } from 'react';
import { Eye, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Order {
  orderNumber: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  customer: { name: string; phone: string; location: string };
  deliveryMethod: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

const statusOptions = ['pending', 'preparing', 'ready', 'completed'];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('moyum-orders') || '[]');
    setOrders(storedOrders.reverse());
  }, []);

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'preparing': return 'bg-blue-500';
      case 'ready': return 'bg-accent';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted';
    }
  };

  const updateOrderStatus = (orderNumber: string, newStatus: string) => {
    const updatedOrders = orders.map(o =>
      o.orderNumber === orderNumber ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem('moyum-orders', JSON.stringify(updatedOrders.reverse()));
    toast.success(`Order ${orderNumber} updated to ${newStatus}`);

    if (selectedOrder?.orderNumber === orderNumber) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-bold">Orders ({orders.length})</h2>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            {statusOptions.map(status => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No orders found</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <Card key={order.orderNumber} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{order.orderNumber}</span>
                    <Badge className={`${getStatusColor(order.status)} text-white capitalize`}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                  <p className="text-sm mt-1">{order.customer.name} • {order.customer.phone}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                  
                  <Select
                    value={order.status}
                    onValueChange={(value) => updateOrderStatus(order.orderNumber, value)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status} className="capitalize">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold">{selectedOrder.orderNumber}</span>
                <Badge className={`${getStatusColor(selectedOrder.status)} text-white capitalize`}>
                  {selectedOrder.status}
                </Badge>
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="font-medium mb-1">Customer</p>
                <p className="text-sm">{selectedOrder.customer.name}</p>
                <p className="text-sm">{selectedOrder.customer.phone}</p>
                {selectedOrder.customer.location && (
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.location}</p>
                )}
              </div>

              <div>
                <p className="font-medium mb-2">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 text-sm">
                <Badge variant="outline" className="capitalize">{selectedOrder.deliveryMethod}</Badge>
                <Badge variant="outline" className="capitalize">{selectedOrder.paymentMethod}</Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                Ordered: {formatDate(selectedOrder.createdAt)}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, User, CreditCard, Truck, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
  });

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (deliveryMethod === 'delivery' && !formData.location) {
      toast.error('Please enter your delivery location');
      return;
    }

    // Generate order number
    const orderNumber = `MOYUM-${Date.now().toString(36).toUpperCase()}`;
    
    // Store order in localStorage for demo
    const order = {
      orderNumber,
      items,
      total,
      customer: formData,
      deliveryMethod,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    const orders = JSON.parse(localStorage.getItem('moyum-orders') || '[]');
    orders.push(order);
    localStorage.setItem('moyum-orders', JSON.stringify(orders));

    clearCart();
    navigate(`/order-confirmation/${orderNumber}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Button onClick={() => navigate('/')}>Back to Menu</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">Checkout</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 py-6 space-y-6 pb-32">
        {/* Order Summary */}
        <Card className="p-4">
          <h2 className="font-bold mb-3">Order Summary</h2>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
          </div>
        </Card>

        {/* Delivery Method */}
        <Card className="p-4">
          <h2 className="font-bold mb-3">Delivery Method</h2>
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer flex-1">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-xs text-muted-foreground">We'll deliver to your location</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer flex-1">
                <Store className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Pickup</p>
                  <p className="text-xs text-muted-foreground">Pick up from our location</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </Card>

        {/* Customer Details */}
        <Card className="p-4">
          <h2 className="font-bold mb-3">Your Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4" /> Name
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4" /> Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+255 XXX XXX XXX"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            {deliveryMethod === 'delivery' && (
              <div>
                <Label htmlFor="location" className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" /> Delivery Location
                </Label>
                <Input
                  id="location"
                  placeholder="Your delivery address"
                  value={formData.location}
                  onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            )}
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-4">
          <h2 className="font-bold mb-3">Payment Method</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="momo" id="momo" />
              <Label htmlFor="momo" className="flex items-center gap-2 cursor-pointer flex-1">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Mobile Money</p>
                  <p className="text-xs text-muted-foreground">M-Pesa, Tigo Pesa, Airtel Money</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                <span className="h-5 w-5 text-primary font-bold">TZS</span>
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">Pay when you receive</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </Card>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold py-6 text-lg">
            Place Order - {formatPrice(total)}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, User, CreditCard, Truck, Store, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { CheckoutProgress } from '@/components/public/CheckoutProgress';
import { toast } from 'sonner';

// Sample location suggestions for Arusha
const locationSuggestions = [
  'Kaloleni Area, Arusha',
  'Njiro, Arusha',
  'Kijenge, Arusha',
  'Sokoni, Arusha',
  'Themi, Arusha',
  'Sekei, Arusha',
  'Lemara, Arusha',
  'Unga Limited, Arusha',
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
  });

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

  // Auto-populate location for pickup
  useEffect(() => {
    if (deliveryMethod === 'pickup') {
      setFormData(prev => ({ ...prev, location: 'Arusha, Njiro, Tanesco' }));
    } else {
      setFormData(prev => ({ ...prev, location: '' }));
    }
  }, [deliveryMethod]);

  // Filter location suggestions as user types
  const handleLocationChange = (value: string) => {
    setFormData(prev => ({ ...prev, location: value }));

    if (value.length >= 2) {
      const filtered = locationSuggestions.filter(loc =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setFormData(prev => ({ ...prev, location: suggestion }));
    setShowSuggestions(false);
  };

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
      <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-muted-foreground mb-6 font-body">Your cart is empty</p>
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 font-heading"
          >
            Back to Menu
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />

      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b-2 border-border shadow-xl">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </motion.div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent font-heading">
              Checkout
            </h1>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8 space-y-8 pb-32 relative z-10">
        <CheckoutProgress currentStep={2} />

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 shadow-2xl border-2 border-primary/20 rounded-3xl bg-gradient-to-br from-card to-primary/5">
            <h2 className="font-extrabold text-2xl mb-6 flex items-center gap-3 font-heading">
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              Order Summary
            </h2>
            <div className="space-y-3">
              {items.map(item => (
                <motion.div
                  key={item.id}
                  className="flex justify-between text-base p-3 rounded-xl bg-background/60 backdrop-blur-sm font-body"
                  whileHover={{ scale: 1.02, x: 4 }}
                >
                  <span className="font-medium">{item.quantity}x {item.name}</span>
                  <span className="font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                </motion.div>
              ))}
              <div className="border-t-2 border-border pt-4 mt-4 flex justify-between text-xl font-extrabold">
                <span className="font-heading">Total</span>
                <span className="text-primary font-heading">{formatPrice(total)}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Delivery Method */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 shadow-2xl border-2 border-primary/20 rounded-3xl">
            <h2 className="font-extrabold text-2xl mb-6 font-heading">Delivery Method</h2>
            <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-4">
              <motion.div
                className={`flex items-center space-x-4 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  deliveryMethod === 'delivery'
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-border hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery" className="flex items-center gap-4 cursor-pointer flex-1 font-body">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Delivery</p>
                    <p className="text-sm text-muted-foreground">We'll deliver to your location</p>
                  </div>
                </Label>
              </motion.div>

              <motion.div
                className={`flex items-center space-x-4 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  deliveryMethod === 'pickup'
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-border hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="flex items-center gap-4 cursor-pointer flex-1 font-body">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <Store className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Pickup</p>
                    <p className="text-sm text-muted-foreground">Pick up from our location</p>
                  </div>
                </Label>
              </motion.div>
            </RadioGroup>
          </Card>
        </motion.div>

        {/* Customer Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 shadow-2xl border-2 border-primary/20 rounded-3xl">
            <h2 className="font-extrabold text-2xl mb-6 font-heading">Your Details</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-3 text-base font-semibold font-body">
                  <User className="h-5 w-5 text-primary" /> Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="py-6 rounded-xl text-base font-body"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-3 text-base font-semibold font-body">
                  <Phone className="h-5 w-5 text-primary" /> Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+255 XXX XXX XXX"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="py-6 rounded-xl text-base font-body"
                />
              </div>

              <div className="relative">
                <Label htmlFor="location" className="flex items-center gap-2 mb-3 text-base font-semibold font-body">
                  <MapPin className="h-5 w-5 text-primary" />
                  {deliveryMethod === 'delivery' ? 'Delivery Location' : 'Pickup Location'}
                </Label>
                <Input
                  id="location"
                  placeholder={deliveryMethod === 'delivery' ? 'Start typing your location...' : 'Pickup location'}
                  value={formData.location}
                  onChange={e => handleLocationChange(e.target.value)}
                  onFocus={() => deliveryMethod === 'delivery' && formData.location.length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  disabled={deliveryMethod === 'pickup'}
                  className="py-6 rounded-xl text-base font-body"
                />

                {/* Location suggestions dropdown */}
                <AnimatePresence>
                  {showSuggestions && deliveryMethod === 'delivery' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 bg-card border-2 border-primary/20 rounded-xl shadow-2xl overflow-hidden"
                    >
                      {filteredSuggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => selectSuggestion(suggestion)}
                          className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors flex items-center gap-3 font-body"
                          whileHover={{ x: 4 }}
                        >
                          <MapPin className="h-4 w-4 text-primary" />
                          {suggestion}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8 shadow-2xl border-2 border-primary/20 rounded-3xl">
            <h2 className="font-extrabold text-2xl mb-6 font-heading">Payment Method</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              <motion.div
                className={`flex items-center space-x-4 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'momo'
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-border hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RadioGroupItem value="momo" id="momo" />
                <Label htmlFor="momo" className="flex items-center gap-4 cursor-pointer flex-1 font-body">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Mobile Money</p>
                    <p className="text-sm text-muted-foreground">M-Pesa, Tigo Pesa, Airtel Money</p>
                  </div>
                </Label>
              </motion.div>

              <motion.div
                className={`flex items-center space-x-4 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-border hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-4 cursor-pointer flex-1 font-body">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <span className="h-6 w-6 text-green-600 font-bold text-lg flex items-center justify-center">TZS</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">Pay when you receive</p>
                  </div>
                </Label>
              </motion.div>
            </RadioGroup>

            {/* Lipa Namba Section */}
            <AnimatePresence>
              {paymentMethod === 'momo' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 font-heading">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      Lipa Namba
                    </h3>
                    <div className="space-y-3 font-body">
                      <div className="flex justify-between items-center bg-white/60 p-3 rounded-xl">
                        <span className="text-muted-foreground">Business Number:</span>
                        <span className="font-bold text-blue-600 text-lg">888 000</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/60 p-3 rounded-xl">
                        <span className="text-muted-foreground">Business Name:</span>
                        <span className="font-bold">MOYUM BIRYANI</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/60 p-3 rounded-xl">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-bold text-primary text-lg">{formatPrice(total)}</span>
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground bg-white/40 p-4 rounded-xl">
                        <p className="font-semibold mb-2">How to pay:</p>
                        <ol className="list-decimal list-inside space-y-1">
                          <li>Dial *150*00# for M-Pesa</li>
                          <li>Select 4 (Lipa kwa M-Pesa)</li>
                          <li>Select 4 (Enter Business Number)</li>
                          <li>Enter <strong>888000</strong></li>
                          <li>Enter amount: <strong>{total}</strong></li>
                          <li>Enter your PIN and confirm</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-card/95 backdrop-blur-xl border-t-2 border-border shadow-2xl z-40">
          <div className="container mx-auto">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 font-extrabold py-8 text-xl shadow-2xl shadow-primary/30 rounded-2xl font-heading"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Place Order - {formatPrice(total)}
              </Button>
            </motion.div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Checkout;

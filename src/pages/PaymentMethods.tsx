import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Plus, Trash2, Check, Smartphone, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  type: 'mobile' | 'card' | 'cash';
  name: string;
  details: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [methods, setMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'mobile', name: 'M-Pesa', details: '**** 5678', isDefault: true },
    { id: '2', type: 'mobile', name: 'Tigo Pesa', details: '**** 1234', isDefault: false },
    { id: '3', type: 'cash', name: 'Cash on Delivery', details: 'Pay when you receive', isDefault: false },
  ]);

  const handleDelete = (id: string) => {
    const method = methods.find(m => m.id === id);
    if (method?.type === 'cash') {
      toast.error('Cannot remove cash payment option');
      return;
    }
    setMethods(methods.filter(m => m.id !== id));
    toast.success('Payment method removed');
  };

  const handleSetDefault = (id: string) => {
    setMethods(methods.map(m => ({ ...m, isDefault: m.id === id })));
    toast.success('Default payment method updated');
  };

  const handleAddMethod = (type: 'mobile' | 'card') => {
    toast.info('Payment method setup coming soon!');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone className="h-5 w-5" />;
      case 'card': return <CreditCard className="h-5 w-5" />;
      case 'cash': return <Banknote className="h-5 w-5" />;
      default: return <CreditCard className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mobile': return 'bg-green-500';
      case 'card': return 'bg-blue-500';
      case 'cash': return 'bg-amber-500';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold font-heading">Payment Methods</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {methods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`p-4 ${method.isDefault ? 'border-2 border-primary' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getTypeColor(method.type)}`}>
                    {getIcon(method.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{method.name}</p>
                      {method.isDefault && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method.details}</p>
                  </div>
                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleSetDefault(method.id)}
                        className="text-primary h-9 w-9"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    {method.type !== 'cash' && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(method.id)}
                        className="text-destructive h-9 w-9"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="pt-4 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground px-1 font-heading">ADD NEW</h3>
          
          <Button 
            onClick={() => handleAddMethod('mobile')}
            variant="outline" 
            className="w-full justify-start gap-3 h-auto py-4 border-dashed border-2"
          >
            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium">Mobile Money</p>
              <p className="text-xs text-muted-foreground">M-Pesa, Tigo Pesa, Airtel Money</p>
            </div>
            <Plus className="h-4 w-4 ml-auto" />
          </Button>

          <Button 
            onClick={() => handleAddMethod('card')}
            variant="outline" 
            className="w-full justify-start gap-3 h-auto py-4 border-dashed border-2"
          >
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium">Credit / Debit Card</p>
              <p className="text-xs text-muted-foreground">Visa, Mastercard</p>
            </div>
            <Plus className="h-4 w-4 ml-auto" />
          </Button>
        </div>

        <Card className="p-4 bg-muted/50 mt-6">
          <h4 className="font-semibold text-foreground mb-2">Payment Security</h4>
          <p className="text-sm text-muted-foreground">
            Your payment information is encrypted and secure. We never store your full card details.
          </p>
        </Card>
      </div>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default PaymentMethods;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, Trash2, Check, X, Home, Building2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Address {
  id: string;
  label: string;
  address: string;
  landmark?: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

const SavedAddresses = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    { 
      id: '1', 
      label: 'Home', 
      address: 'Plot 123, Mikocheni B, Dar es Salaam', 
      landmark: 'Near Shoppers Plaza',
      isDefault: true,
      type: 'home'
    },
    { 
      id: '2', 
      label: 'Office', 
      address: 'Tanzania Ports Authority, Kivukoni, Dar es Salaam', 
      isDefault: false,
      type: 'work'
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newType, setNewType] = useState<'home' | 'work' | 'other'>('home');

  const handleAdd = () => {
    if (!newAddress.trim()) {
      toast.error('Please enter an address');
      return;
    }
    const address: Address = {
      id: Date.now().toString(),
      label: newLabel || 'Address',
      address: newAddress,
      landmark: newLandmark || undefined,
      isDefault: addresses.length === 0,
      type: newType,
    };
    setAddresses([...addresses, address]);
    setNewAddress('');
    setNewLabel('');
    setNewLandmark('');
    setNewType('home');
    setIsAdding(false);
    toast.success('Address added');
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast.success('Address removed');
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    toast.success('Default address updated');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="h-5 w-5" />;
      case 'work': return <Briefcase className="h-5 w-5" />;
      default: return <Building2 className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold font-heading">Saved Addresses</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {addresses.map((addr, index) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    addr.isDefault ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {getTypeIcon(addr.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{addr.label}</p>
                      {addr.isDefault && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{addr.address}</p>
                    {addr.landmark && (
                      <p className="text-xs text-muted-foreground mt-1">📍 {addr.landmark}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {!addr.isDefault && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-primary h-8 w-8"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(addr.id)}
                      className="text-destructive h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {isAdding ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4 space-y-4 border-2 border-primary">
              <div className="flex gap-2">
                {(['home', 'work', 'other'] as const).map((type) => (
                  <Button
                    key={type}
                    variant={newType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewType(type)}
                    className="flex-1 gap-1 capitalize"
                  >
                    {getTypeIcon(type)}
                    {type}
                  </Button>
                ))}
              </div>
              <Input
                placeholder="Label (e.g., Mom's House)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />
              <Textarea
                placeholder="Full address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                rows={2}
              />
              <Input
                placeholder="Landmark (optional)"
                value={newLandmark}
                onChange={(e) => setNewLandmark(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="flex-1 gap-2">
                  <Check className="h-4 w-4" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAdding(false)}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <Button 
            onClick={() => setIsAdding(true)}
            variant="outline" 
            className="w-full gap-2 border-dashed border-2"
          >
            <Plus className="h-4 w-4" />
            Add Address
          </Button>
        )}

        {addresses.length === 0 && !isAdding && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No addresses saved yet</p>
          </div>
        )}
      </div>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default SavedAddresses;

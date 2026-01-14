import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface PhoneNumber {
  id: string;
  number: string;
  label: string;
  isDefault: boolean;
}

const SavedPhones = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [phones, setPhones] = useState<PhoneNumber[]>([
    { id: '1', number: '+255 712 345 678', label: 'Primary', isDefault: true },
    { id: '2', number: '+255 754 987 654', label: 'Work', isDefault: false },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNumber, setNewNumber] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newNumber.trim()) {
      toast.error('Please enter a phone number');
      return;
    }
    const phone: PhoneNumber = {
      id: Date.now().toString(),
      number: newNumber,
      label: newLabel || 'Phone',
      isDefault: phones.length === 0,
    };
    setPhones([...phones, phone]);
    setNewNumber('');
    setNewLabel('');
    setIsAdding(false);
    toast.success('Phone number added');
  };

  const handleDelete = (id: string) => {
    setPhones(phones.filter(p => p.id !== id));
    toast.success('Phone number removed');
  };

  const handleSetDefault = (id: string) => {
    setPhones(phones.map(p => ({ ...p, isDefault: p.id === id })));
    toast.success('Default number updated');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold font-heading">Saved Phone Numbers</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {phones.map((phone, index) => (
            <motion.div
              key={phone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    phone.isDefault ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{phone.number}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{phone.label}</span>
                      {phone.isDefault && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!phone.isDefault && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleSetDefault(phone.id)}
                        className="text-primary"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(phone.id)}
                      className="text-destructive"
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
              <Input
                placeholder="Phone number (e.g., +255 712 345 678)"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
              />
              <Input
                placeholder="Label (e.g., Home, Work)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
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
            Add Phone Number
          </Button>
        )}

        {phones.length === 0 && !isAdding && (
          <div className="text-center py-12">
            <Phone className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No phone numbers saved yet</p>
          </div>
        )}
      </div>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default SavedPhones;

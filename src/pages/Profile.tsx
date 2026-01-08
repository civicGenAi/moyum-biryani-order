import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, MapPin, Settings, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BottomNav } from '@/components/public/BottomNav';
import { useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">Profile</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        <Card className="p-6 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-bold text-lg mb-1">Guest User</h2>
          <p className="text-sm text-muted-foreground mb-4">Sign in to save your orders</p>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </Card>

        <Card className="divide-y divide-border">
          <button className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span>Saved Phone Numbers</span>
          </button>
          <button className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span>Saved Addresses</span>
          </button>
          <button className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span>Settings</span>
          </button>
        </Card>

        <div className="text-center pt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin')}
            className="text-muted-foreground"
          >
            Admin Dashboard
          </Button>
        </div>
      </div>

      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default Profile;

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, MapPin, Settings, LogIn, Heart, Bell, HelpCircle, ChevronRight, LogOut, Gift, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBranch } from '@/contexts/BranchContext';

const Profile = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { selectedBranch } = useBranch();

  const menuItems = [
    { icon: Phone, label: 'Saved Phone Numbers', description: 'Manage your contact numbers', path: null },
    { icon: MapPin, label: 'Saved Addresses', description: 'Delivery addresses', path: null },
    { icon: Heart, label: 'Favorites', description: 'Your favorite items', path: null },
    { icon: Gift, label: 'Rewards & Offers', description: 'View your rewards', path: null },
    { icon: CreditCard, label: 'Payment Methods', description: 'Manage payment options', path: null },
  ];

  const settingsItems = [
    { icon: Bell, label: 'Push Notifications', hasSwitch: true },
    { icon: Shield, label: 'Privacy & Security', path: '/privacy-policy' },
    { icon: HelpCircle, label: 'Help & Support', path: '/contact' },
    { icon: Settings, label: 'App Settings', path: null },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold font-heading">Profile</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-primary/10 via-card to-accent/10 border-2 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-xl font-heading">Guest User</h2>
                <p className="text-sm text-muted-foreground mb-3">Sign in to save your orders</p>
                <Button size="sm" className="bg-primary hover:bg-primary/90 gap-2 font-heading">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Current Location */}
        {selectedBranch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-4 border-dashed border-2 border-primary/30 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Current Location</p>
                  <p className="font-semibold text-foreground">{selectedBranch.name}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary text-xs">
                  Change
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Account Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1 font-heading">ACCOUNT</h3>
          <Card className="divide-y divide-border overflow-hidden">
            {menuItems.map(({ icon: Icon, label, description, path }, index) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => path && navigate(path)}
                className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </motion.button>
            ))}
          </Card>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1 font-heading">SETTINGS</h3>
          <Card className="divide-y divide-border overflow-hidden">
            {settingsItems.map(({ icon: Icon, label, hasSwitch, path }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => !hasSwitch && path && navigate(path)}
                className={`w-full p-4 flex items-center gap-4 ${!hasSwitch ? 'hover:bg-muted/50 cursor-pointer' : ''} transition-colors`}
              >
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{label}</p>
                </div>
                {hasSwitch ? (
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </motion.div>
            ))}
          </Card>
        </motion.div>

        {/* Admin & Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="space-y-3"
        >
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin')}
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Admin Dashboard
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button 
            variant="ghost" 
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 justify-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>

        {/* App Version */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </div>
      </div>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default Profile;

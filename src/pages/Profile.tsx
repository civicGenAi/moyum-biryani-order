import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, MapPin, Settings, LogIn, Heart, Bell, HelpCircle, ChevronRight, LogOut, Gift, Shield, CreditCard, Store, Check, Cake, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBranch } from '@/contexts/BranchContext';
import { productCategories } from '@/data/branches';

const Profile = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [locationSheetOpen, setLocationSheetOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { branches, selectedBranch, setSelectedBranch } = useBranch();
  const activeBranches = branches.filter(b => b.isActive);

  const menuItems = [
    { icon: Phone, label: 'Saved Phone Numbers', description: 'Manage your contact numbers', path: '/profile/phones' },
    { icon: MapPin, label: 'Saved Addresses', description: 'Delivery addresses', path: '/profile/addresses' },
    { icon: Heart, label: 'Favorites', description: 'Your favorite items', path: '/profile/favorites' },
    { icon: Gift, label: 'Rewards & Offers', description: 'View your rewards', path: '/profile/rewards' },
    { icon: CreditCard, label: 'Payment Methods', description: 'Manage payment options', path: '/profile/payments' },
  ];

  const settingsItems = [
    { icon: Bell, label: 'Push Notifications', hasSwitch: true },
    { icon: Shield, label: 'Privacy & Security', path: '/privacy-policy' },
    { icon: HelpCircle, label: 'Help & Support', path: '/contact' },
    { icon: Settings, label: 'App Settings', path: '/profile/settings' },
  ];

  const handleSelectBranch = (branch: typeof selectedBranch) => {
    if (branch) {
      setSelectedBranch(branch);
      setLocationSheetOpen(false);
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'cakes':
        return <Cake className="h-4 w-4" />;
      case 'biryani':
        return <Utensils className="h-4 w-4" />;
      default:
        return null;
    }
  };

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
            <Sheet open={locationSheetOpen} onOpenChange={setLocationSheetOpen}>
              <SheetTrigger asChild>
                <Card className="p-4 border-dashed border-2 border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
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
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-3xl">
                <SheetHeader className="pb-4 border-b border-border">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    Choose Your Location
                  </SheetTitle>
                </SheetHeader>
                
                <div className="py-4 space-y-3 overflow-y-auto max-h-[50vh]">
                  {activeBranches.map((branch, index) => (
                    <motion.button
                      key={branch.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSelectBranch(branch)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                        selectedBranch?.id === branch.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-3 rounded-xl ${
                          selectedBranch?.id === branch.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <Store className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-foreground">{branch.name}</h3>
                            {selectedBranch?.id === branch.id && (
                              <div className="bg-primary text-primary-foreground rounded-full p-1">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{branch.address}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {branch.categories.map(catId => {
                              const cat = productCategories.find(c => c.id === catId);
                              return cat ? (
                                <span
                                  key={catId}
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                    catId === 'cakes' 
                                      ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
                                      : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                                  }`}
                                >
                                  {getCategoryIcon(catId)}
                                  {cat.name}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
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

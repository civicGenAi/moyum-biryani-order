import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Moon, Sun, Bell, Volume2, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const AppSettings = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    language: 'en',
    soundEffects: true,
    orderNotifications: true,
    promoNotifications: false,
    autoLocation: true,
  });

  const updateSetting = (key: keyof typeof settings, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success('Setting updated');
  };

  const clearCache = () => {
    localStorage.clear();
    toast.success('Cache cleared. Reloading...');
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold font-heading">App Settings</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1 font-heading">APPEARANCE</h3>
          <Card className="divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  {settings.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Toggle dark theme</p>
                </div>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(val) => updateSetting('darkMode', val)}
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Language</p>
                  <p className="text-xs text-muted-foreground">Select app language</p>
                </div>
              </div>
              <Select
                value={settings.language}
                onValueChange={(val) => updateSetting('language', val)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sw">Kiswahili</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1 font-heading">NOTIFICATIONS</h3>
          <Card className="divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Order Updates</p>
                  <p className="text-xs text-muted-foreground">Get notified about your orders</p>
                </div>
              </div>
              <Switch
                checked={settings.orderNotifications}
                onCheckedChange={(val) => updateSetting('orderNotifications', val)}
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Promotions</p>
                  <p className="text-xs text-muted-foreground">Receive offers and discounts</p>
                </div>
              </div>
              <Switch
                checked={settings.promoNotifications}
                onCheckedChange={(val) => updateSetting('promoNotifications', val)}
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Volume2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Sound Effects</p>
                  <p className="text-xs text-muted-foreground">Play sounds for actions</p>
                </div>
              </div>
              <Switch
                checked={settings.soundEffects}
                onCheckedChange={(val) => updateSetting('soundEffects', val)}
              />
            </div>
          </Card>
        </motion.div>

        {/* Data & Storage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1 font-heading">DATA & STORAGE</h3>
          <Card className="divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Auto-detect Location</p>
                  <p className="text-xs text-muted-foreground">Use GPS to find nearby branch</p>
                </div>
              </div>
              <Switch
                checked={settings.autoLocation}
                onCheckedChange={(val) => updateSetting('autoLocation', val)}
              />
            </div>

            <button 
              onClick={clearCache}
              className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-destructive">Clear Cache</p>
                <p className="text-xs text-muted-foreground">Delete local data and reset app</p>
              </div>
            </button>
          </Card>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 bg-muted/50 text-center">
            <p className="font-semibold text-foreground">Biryani & Cakes</p>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            <p className="text-xs text-muted-foreground mt-2">© 2024 All rights reserved</p>
          </Card>
        </motion.div>
      </div>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default AppSettings;

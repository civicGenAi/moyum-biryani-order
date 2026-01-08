import { useState } from 'react';
import { Save, MapPin, Phone, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    businessName: 'MOYUM Chicken Biriani',
    tagline: 'Rich Taste • Authentic Flavor',
    phone1: '+255 123 456 789',
    phone2: '',
    address: 'Dar es Salaam, Tanzania',
    openingTime: '10:00',
    closingTime: '22:00',
    momoNumber: '',
    whatsapp: '+255 123 456 789',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('moyum-settings', JSON.stringify(settings));
    toast.success('Settings saved successfully');
  };

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      {/* Business Info */}
      <Card className="p-6">
        <h2 className="font-bold text-lg mb-4">Business Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={settings.businessName}
              onChange={e => handleChange('businessName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={settings.tagline}
              onChange={e => handleChange('tagline', e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Contact */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-lg">Contact Numbers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone1">Primary Phone</Label>
            <Input
              id="phone1"
              value={settings.phone1}
              onChange={e => handleChange('phone1', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone2">Secondary Phone</Label>
            <Input
              id="phone2"
              value={settings.phone2}
              onChange={e => handleChange('phone2', e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input
              id="whatsapp"
              value={settings.whatsapp}
              onChange={e => handleChange('whatsapp', e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Location */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-lg">Location</h2>
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={settings.address}
            onChange={e => handleChange('address', e.target.value)}
            rows={2}
          />
        </div>
      </Card>

      {/* Operating Hours */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-lg">Operating Hours</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="openingTime">Opening Time</Label>
            <Input
              id="openingTime"
              type="time"
              value={settings.openingTime}
              onChange={e => handleChange('openingTime', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="closingTime">Closing Time</Label>
            <Input
              id="closingTime"
              type="time"
              value={settings.closingTime}
              onChange={e => handleChange('closingTime', e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Payment */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-lg">Payment Details</h2>
        </div>
        <div>
          <Label htmlFor="momoNumber">Mobile Money Number</Label>
          <Input
            id="momoNumber"
            value={settings.momoNumber}
            onChange={e => handleChange('momoNumber', e.target.value)}
            placeholder="M-Pesa / Tigo Pesa number"
          />
        </div>
      </Card>

      <Button type="submit" className="bg-primary hover:bg-primary/90 gap-2">
        <Save className="h-4 w-4" />
        Save Settings
      </Button>
    </form>
  );
};

export default AdminSettings;

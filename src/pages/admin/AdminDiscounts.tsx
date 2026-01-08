import { useState } from 'react';
import { Plus, Trash2, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Discount {
  id: string;
  name: string;
  percentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const AdminDiscounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: '1',
      name: "Today's Special",
      percentage: 10,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      isActive: true,
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleToggle = (id: string) => {
    setDiscounts(prev =>
      prev.map(d => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
    toast.success('Discount status updated');
  };

  const handleDelete = (id: string) => {
    setDiscounts(prev => prev.filter(d => d.id !== id));
    toast.success('Discount deleted');
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newDiscount: Discount = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      percentage: parseInt(formData.get('percentage') as string),
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      isActive: true,
    };

    setDiscounts(prev => [...prev, newDiscount]);
    setDialogOpen(false);
    toast.success('Discount created');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Discounts & Offers</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="h-4 w-4" />
              Add Discount
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Discount</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="name">Promo Name</Label>
                <Input id="name" name="name" placeholder="e.g. Weekend Special" required />
              </div>
              <div>
                <Label htmlFor="percentage">Discount %</Label>
                <Input
                  id="percentage"
                  name="percentage"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="10"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" name="startDate" type="date" required />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" name="endDate" type="date" required />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Create
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {discounts.length === 0 ? (
        <Card className="p-8 text-center">
          <Percent className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground">No discounts created yet</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {discounts.map(discount => (
            <Card key={discount.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold">{discount.name}</h3>
                  <p className="text-2xl font-bold text-primary">{discount.percentage}% OFF</p>
                </div>
                <Switch checked={discount.isActive} onCheckedChange={() => handleToggle(discount.id)} />
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                {discount.startDate} → {discount.endDate}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    discount.isActive ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {discount.isActive ? 'Active' : 'Inactive'}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(discount.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDiscounts;

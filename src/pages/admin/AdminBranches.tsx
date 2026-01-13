import { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Phone, Clock, Store, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useBranch } from '@/contexts/BranchContext';
import { productCategories, Branch } from '@/data/branches';

const AdminBranches = () => {
  const { branches, addBranch, updateBranch, deleteBranch } = useBranch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    phone: '',
    whatsapp: '',
    openingTime: '10:00',
    closingTime: '22:00',
    categories: [] as string[],
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      city: '',
      address: '',
      phone: '',
      whatsapp: '',
      openingTime: '10:00',
      closingTime: '22:00',
      categories: [],
      isActive: true,
    });
    setEditingBranch(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      city: branch.city,
      address: branch.address,
      phone: branch.phone,
      whatsapp: branch.whatsapp,
      openingTime: branch.openingTime,
      closingTime: branch.closingTime,
      categories: branch.categories,
      isActive: branch.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.city) {
      toast.error('Please fill in required fields');
      return;
    }

    if (editingBranch) {
      updateBranch(editingBranch.id, formData);
      toast.success('Branch updated successfully');
    } else {
      addBranch(formData);
      toast.success('Branch added successfully');
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (branches.length === 1) {
      toast.error('Cannot delete the last branch');
      return;
    }
    deleteBranch(id);
    toast.success('Branch deleted successfully');
  };

  const toggleCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Branches</h1>
          <p className="text-muted-foreground">Manage your store locations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBranch ? 'Edit Branch' : 'Add New Branch'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Branch Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Main Branch"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="e.g., Dar es Salaam"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+255..."
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Full address"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={e => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="+255..."
                  />
                </div>
                <div>
                  <Label htmlFor="openingTime">Opening Time</Label>
                  <Input
                    id="openingTime"
                    type="time"
                    value={formData.openingTime}
                    onChange={e => setFormData(prev => ({ ...prev, openingTime: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="closingTime">Closing Time</Label>
                  <Input
                    id="closingTime"
                    type="time"
                    value={formData.closingTime}
                    onChange={e => setFormData(prev => ({ ...prev, closingTime: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Products Sold at this Branch</Label>
                <div className="flex flex-wrap gap-3">
                  {productCategories.map(category => (
                    <div
                      key={category.id}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.categories.includes(category.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      <Checkbox
                        checked={formData.categories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={checked => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label>Branch is Active</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingBranch ? 'Update' : 'Add'} Branch
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {branches.map(branch => (
          <Card key={branch.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${branch.isActive ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Store className={`h-6 w-6 ${branch.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{branch.name}</h3>
                  <p className="text-muted-foreground text-sm">{branch.city}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => openEditDialog(branch)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(branch.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{branch.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{branch.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{branch.openingTime} - {branch.closingTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {branch.categories.map(catId => {
                const cat = productCategories.find(c => c.id === catId);
                return cat ? (
                  <Badge key={catId} variant="secondary" className="gap-1">
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Badge>
                ) : null;
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={branch.isActive ? 'default' : 'secondary'}>
                {branch.isActive ? (
                  <><Check className="h-3 w-3 mr-1" /> Active</>
                ) : (
                  <><X className="h-3 w-3 mr-1" /> Inactive</>
                )}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBranches;

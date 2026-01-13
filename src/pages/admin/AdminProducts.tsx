import { useState } from 'react';
import { Plus, Edit, Trash2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { menuItems as initialItems, MenuItem } from '@/data/menuItems';
import { toast } from 'sonner';

const AdminProducts = () => {
  const [products, setProducts] = useState<MenuItem[]>(initialItems);
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

  const handleToggleAvailability = (id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p))
    );
    toast.success('Product availability updated');
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
    const category = formData.get('category') as string;
    const productType = formData.get('productType') as 'biryani' | 'cakes';

    if (editingProduct) {
      setProducts(prev =>
        prev.map(p =>
          p.id === editingProduct.id
            ? { ...p, name, description, price, category, productType }
            : p
        )
      );
      toast.success('Product updated');
    } else {
      const newProduct: MenuItem = {
        id: Date.now().toString(),
        name,
        description,
        price,
        category,
        productType,
        image: initialItems[0].image,
        isAvailable: true,
      };
      setProducts(prev => [...prev, newProduct]);
      toast.success('Product added');
    }

    setDialogOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Products ({products.length})</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setEditingProduct(null)}>
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingProduct?.name}
                  placeholder="e.g. Classic Chicken Biriani"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingProduct?.description}
                  placeholder="Brief description..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price (TZS)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={editingProduct?.price}
                  placeholder="8000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  defaultValue={editingProduct?.category}
                  placeholder="e.g. Individual, Family, Cakes"
                  required
                />
              </div>
              <div>
                <Label htmlFor="productType">Product Type</Label>
                <select
                  id="productType"
                  name="productType"
                  defaultValue={editingProduct?.productType || 'biryani'}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="biryani">🍛 Biryani</option>
                  <option value="cakes">🎂 Cakes</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {editingProduct ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                </div>
              </div>
              <p className="text-primary font-bold mb-3">{formatPrice(product.price)}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={product.isAvailable}
                    onCheckedChange={() => handleToggleAvailability(product.id)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {product.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setEditingProduct(product);
                      setDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;

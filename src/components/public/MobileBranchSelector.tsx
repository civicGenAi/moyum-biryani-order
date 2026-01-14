import { useState } from 'react';
import { MapPin, ChevronRight, Store, Check, Cake, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useBranch } from '@/contexts/BranchContext';
import { productCategories } from '@/data/branches';

export const MobileBranchSelector = () => {
  const { branches, selectedBranch, setSelectedBranch } = useBranch();
  const [open, setOpen] = useState(false);
  const activeBranches = branches.filter(b => b.isActive);

  const handleSelect = (branch: typeof selectedBranch) => {
    if (branch) {
      setSelectedBranch(branch);
      setOpen(false);
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <motion.button
          className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <MapPin className="h-4 w-4" />
          <span className="max-w-[120px] truncate">{selectedBranch?.city || 'Select Location'}</span>
          <ChevronRight className="h-4 w-4" />
        </motion.button>
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
              onClick={() => handleSelect(branch)}
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
  );
};

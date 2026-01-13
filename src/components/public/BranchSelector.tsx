import { useState } from 'react';
import { MapPin, ChevronDown, Check, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useBranch } from '@/contexts/BranchContext';
import { productCategories } from '@/data/branches';

export const BranchSelector = () => {
  const { branches, selectedBranch, setSelectedBranch } = useBranch();
  const activeBranches = branches.filter(b => b.isActive);

  if (activeBranches.length <= 1) {
    return selectedBranch ? (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        <span>{selectedBranch.city}</span>
      </div>
    ) : null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">{selectedBranch?.city || 'Select Location'}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 bg-card border shadow-xl">
        <div className="p-2 border-b">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Select Your Location
          </p>
        </div>
        {activeBranches.map(branch => (
          <DropdownMenuItem
            key={branch.id}
            onClick={() => setSelectedBranch(branch)}
            className="p-3 cursor-pointer focus:bg-primary/10"
          >
            <div className="flex items-start gap-3 w-full">
              <div className={`p-2 rounded-lg ${selectedBranch?.id === branch.id ? 'bg-primary/20' : 'bg-muted'}`}>
                <Store className={`h-4 w-4 ${selectedBranch?.id === branch.id ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{branch.name}</span>
                  {selectedBranch?.id === branch.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{branch.address}</p>
                <div className="flex gap-1 mt-1">
                  {branch.categories.map(catId => {
                    const cat = productCategories.find(c => c.id === catId);
                    return cat ? (
                      <span key={catId} className="text-xs" title={cat.name}>
                        {cat.icon}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

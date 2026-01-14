import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Branch, defaultBranches } from '@/data/branches';

type BranchTheme = 'biryani' | 'cakes' | 'mixed';

interface BranchContextType {
  branches: Branch[];
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch) => void;
  addBranch: (branch: Omit<Branch, 'id'>) => void;
  updateBranch: (id: string, updates: Partial<Branch>) => void;
  deleteBranch: (id: string) => void;
  branchTheme: BranchTheme;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};

interface BranchProviderProps {
  children: ReactNode;
}

const getBranchTheme = (branch: Branch | null): BranchTheme => {
  if (!branch) return 'biryani';
  const hasCakes = branch.categories.includes('cakes');
  const hasBiryani = branch.categories.includes('biryani');
  if (hasCakes && hasBiryani) return 'mixed';
  if (hasCakes) return 'cakes';
  return 'biryani';
};

export const BranchProvider = ({ children }: BranchProviderProps) => {
  const [branches, setBranches] = useState<Branch[]>(() => {
    const saved = localStorage.getItem('moyum-branches');
    return saved ? JSON.parse(saved) : defaultBranches;
  });

  const [selectedBranch, setSelectedBranchState] = useState<Branch | null>(() => {
    const savedId = localStorage.getItem('moyum-selected-branch');
    if (savedId && branches.length > 0) {
      return branches.find(b => b.id === savedId) || branches[0];
    }
    return branches[0] || null;
  });

  const [branchTheme, setBranchTheme] = useState<BranchTheme>(() => 
    getBranchTheme(selectedBranch)
  );

  // Apply theme to document
  useEffect(() => {
    const theme = getBranchTheme(selectedBranch);
    setBranchTheme(theme);
    
    if (theme === 'biryani') {
      document.documentElement.removeAttribute('data-branch-theme');
    } else {
      document.documentElement.setAttribute('data-branch-theme', theme);
    }
  }, [selectedBranch]);

  useEffect(() => {
    localStorage.setItem('moyum-branches', JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    if (selectedBranch) {
      localStorage.setItem('moyum-selected-branch', selectedBranch.id);
    }
  }, [selectedBranch]);

  const setSelectedBranch = (branch: Branch) => {
    setSelectedBranchState(branch);
  };

  const addBranch = (branchData: Omit<Branch, 'id'>) => {
    const newBranch: Branch = {
      ...branchData,
      id: `branch-${Date.now()}`,
    };
    setBranches(prev => [...prev, newBranch]);
  };

  const updateBranch = (id: string, updates: Partial<Branch>) => {
    setBranches(prev =>
      prev.map(branch => (branch.id === id ? { ...branch, ...updates } : branch))
    );
    // Update selected branch if it's the one being edited
    if (selectedBranch?.id === id) {
      setSelectedBranchState(prev => prev ? { ...prev, ...updates } : prev);
    }
  };

  const deleteBranch = (id: string) => {
    setBranches(prev => prev.filter(branch => branch.id !== id));
    // If deleted branch was selected, select another one
    if (selectedBranch?.id === id) {
      const remaining = branches.filter(b => b.id !== id);
      setSelectedBranchState(remaining[0] || null);
    }
  };

  return (
    <BranchContext.Provider
      value={{
        branches,
        selectedBranch,
        setSelectedBranch,
        addBranch,
        updateBranch,
        deleteBranch,
        branchTheme,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

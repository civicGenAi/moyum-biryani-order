import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Branch, defaultBranches } from '@/data/branches';

interface BranchContextType {
  branches: Branch[];
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch) => void;
  addBranch: (branch: Omit<Branch, 'id'>) => void;
  updateBranch: (id: string, updates: Partial<Branch>) => void;
  deleteBranch: (id: string) => void;
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

export const BranchProvider = ({ children }: BranchProviderProps) => {
  const [branches, setBranches] = useState<Branch[]>(() => {
    const saved = localStorage.getItem('moyum-branches');
    return saved ? JSON.parse(saved) : defaultBranches;
  });

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(() => {
    const savedId = localStorage.getItem('moyum-selected-branch');
    if (savedId && branches.length > 0) {
      return branches.find(b => b.id === savedId) || branches[0];
    }
    return branches[0] || null;
  });

  useEffect(() => {
    localStorage.setItem('moyum-branches', JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    if (selectedBranch) {
      localStorage.setItem('moyum-selected-branch', selectedBranch.id);
    }
  }, [selectedBranch]);

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
      setSelectedBranch(prev => prev ? { ...prev, ...updates } : prev);
    }
  };

  const deleteBranch = (id: string) => {
    setBranches(prev => prev.filter(branch => branch.id !== id));
    // If deleted branch was selected, select another one
    if (selectedBranch?.id === id) {
      const remaining = branches.filter(b => b.id !== id);
      setSelectedBranch(remaining[0] || null);
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
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

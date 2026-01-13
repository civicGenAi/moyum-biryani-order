export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  openingTime: string;
  closingTime: string;
  categories: string[]; // What they sell: 'biryani', 'cakes', etc.
  isActive: boolean;
}

export const defaultBranches: Branch[] = [
  {
    id: 'dar-main',
    name: 'Dar es Salaam Main',
    city: 'Dar es Salaam',
    address: 'Dar es Salaam, Tanzania',
    phone: '+255 123 456 789',
    whatsapp: '+255 123 456 789',
    openingTime: '10:00',
    closingTime: '22:00',
    categories: ['biryani', 'cakes'],
    isActive: true,
  },
  {
    id: 'morogoro',
    name: 'Morogoro Branch',
    city: 'Morogoro',
    address: 'Morogoro, Tanzania',
    phone: '+255 234 567 890',
    whatsapp: '+255 234 567 890',
    openingTime: '10:00',
    closingTime: '21:00',
    categories: ['biryani'],
    isActive: true,
  },
];

export const productCategories = [
  { id: 'biryani', name: 'Biryani', icon: '🍛' },
  { id: 'cakes', name: 'Cakes', icon: '🎂' },
];

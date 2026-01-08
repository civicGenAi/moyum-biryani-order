import birianiPoster from '@/assets/biriani-poster.jpeg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  isSpecial?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Chicken Biriani',
    description: 'Aromatic basmati rice with tender chicken, slow-cooked with authentic spices',
    price: 8000,
    image: birianiPoster,
    category: 'Biriani',
    isAvailable: true,
    isSpecial: true,
  },
  {
    id: '2',
    name: 'Special Chicken Biriani',
    description: 'Extra portion with boiled egg and salad, premium spice blend',
    price: 12000,
    image: birianiPoster,
    category: 'Biriani',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Family Pack Biriani',
    description: 'Serves 4-5 people, comes with raita and salad',
    price: 35000,
    image: birianiPoster,
    category: 'Biriani',
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Biriani with Extra Chicken',
    description: 'Double chicken portion for meat lovers',
    price: 15000,
    image: birianiPoster,
    category: 'Biriani',
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Soft Drink',
    description: 'Coca-Cola, Fanta, or Sprite (500ml)',
    price: 1500,
    image: birianiPoster,
    category: 'Drinks',
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Fresh Juice',
    description: 'Mango, Orange, or Mixed fruit juice',
    price: 3000,
    image: birianiPoster,
    category: 'Drinks',
    isAvailable: true,
  },
];

export const categories = ['All', 'Biriani', 'Drinks'];

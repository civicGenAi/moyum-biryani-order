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
  // Individual Servings
  {
    id: '1',
    name: 'Classic Chicken Biryani',
    description: 'Aromatic basmati rice with tender chicken, slow-cooked with authentic spices',
    price: 8000,
    image: birianiPoster,
    category: 'Individual',
    isAvailable: true,
    isSpecial: true,
  },
  {
    id: '2',
    name: 'Special Chicken Biryani',
    description: 'Extra portion with boiled egg and salad, premium spice blend',
    price: 12000,
    image: birianiPoster,
    category: 'Individual',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Biryani with Extra Chicken',
    description: 'Double chicken portion for meat lovers',
    price: 15000,
    image: birianiPoster,
    category: 'Individual',
    isAvailable: true,
  },

  // Friends Pack (2-3 people)
  {
    id: '4',
    name: 'Friends Sharing Biryani',
    description: 'Perfect for 2-3 people, comes with raita and salad',
    price: 25000,
    image: birianiPoster,
    category: 'Friends',
    isAvailable: true,
  },

  // Family Pack (4-6 people)
  {
    id: '5',
    name: 'Family Pack Biryani',
    description: 'Serves 4-6 people, comes with raita, salad, and sides',
    price: 45000,
    image: birianiPoster,
    category: 'Family',
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Premium Family Feast',
    description: 'Deluxe family pack with extra chicken, drinks, and dessert',
    price: 65000,
    image: birianiPoster,
    category: 'Family',
    isAvailable: true,
  },

  // Events (Large Groups)
  {
    id: '7',
    name: 'Event Catering Pack',
    description: 'Serves 10-15 people, perfect for parties and celebrations',
    price: 120000,
    image: birianiPoster,
    category: 'Events',
    isAvailable: true,
  },
  {
    id: '8',
    name: 'Corporate Event Pack',
    description: 'Serves 20-25 people, includes appetizers and drinks',
    price: 220000,
    image: birianiPoster,
    category: 'Events',
    isAvailable: true,
  },

  // Customized
  {
    id: '9',
    name: 'Build Your Own Biryani',
    description: 'Customize your biryani with your choice of ingredients and portions',
    price: 10000,
    image: birianiPoster,
    category: 'Customized',
    isAvailable: true,
  },
  {
    id: '10',
    name: 'Custom Event Catering',
    description: 'Tell us what you need! We will create a perfect menu for your event',
    price: 0, // Price on request
    image: birianiPoster,
    category: 'Customized',
    isAvailable: true,
  },

  // Drinks
  {
    id: '11',
    name: 'Soft Drink',
    description: 'Coca-Cola, Fanta, or Sprite (500ml)',
    price: 1500,
    image: birianiPoster,
    category: 'Drinks',
    isAvailable: true,
  },
  {
    id: '12',
    name: 'Fresh Juice',
    description: 'Mango, Orange, or Mixed fruit juice',
    price: 3000,
    image: birianiPoster,
    category: 'Drinks',
    isAvailable: true,
  },
];

export const categories = ['All', 'Individual', 'Friends', 'Family', 'Events', 'Customized', 'Drinks'];

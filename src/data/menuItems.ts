import birianiPoster from '@/assets/biriani-poster.jpeg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  productType: 'biryani' | 'cakes'; // What type of product
  isAvailable: boolean;
  isSpecial?: boolean;
}

export const menuItems: MenuItem[] = [
  // Individual Biryani Servings
  {
    id: '1',
    name: 'Classic Chicken Biryani',
    description: 'Aromatic basmati rice with tender chicken, slow-cooked with authentic spices',
    price: 8000,
    image: birianiPoster,
    category: 'Individual',
    productType: 'biryani',
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
    productType: 'biryani',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Biryani with Extra Chicken',
    description: 'Double chicken portion for meat lovers',
    price: 15000,
    image: birianiPoster,
    category: 'Individual',
    productType: 'biryani',
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
    productType: 'biryani',
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
    productType: 'biryani',
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Premium Family Feast',
    description: 'Deluxe family pack with extra chicken, drinks, and dessert',
    price: 65000,
    image: birianiPoster,
    category: 'Family',
    productType: 'biryani',
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
    productType: 'biryani',
    isAvailable: true,
  },
  {
    id: '8',
    name: 'Corporate Event Pack',
    description: 'Serves 20-25 people, includes appetizers and drinks',
    price: 220000,
    image: birianiPoster,
    category: 'Events',
    productType: 'biryani',
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
    productType: 'biryani',
    isAvailable: true,
  },
  {
    id: '10',
    name: 'Custom Event Catering',
    description: 'Tell us what you need! We will create a perfect menu for your event',
    price: 0, // Price on request
    image: birianiPoster,
    category: 'Customized',
    productType: 'biryani',
    isAvailable: true,
  },

  // Cakes (Only available in Dar es Salaam)
  {
    id: '11',
    name: 'Chocolate Layer Cake',
    description: 'Rich chocolate layers with creamy ganache frosting',
    price: 35000,
    image: birianiPoster, // Will need cake image
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
    isSpecial: true,
  },
  {
    id: '12',
    name: 'Vanilla Birthday Cake',
    description: 'Classic vanilla cake with buttercream, customizable decorations',
    price: 30000,
    image: birianiPoster,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
  },
  {
    id: '13',
    name: 'Red Velvet Cake',
    description: 'Velvety soft cake with cream cheese frosting',
    price: 40000,
    image: birianiPoster,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
  },
  {
    id: '14',
    name: 'Custom Wedding Cake',
    description: 'Multi-tier cake designed for your special day',
    price: 150000,
    image: birianiPoster,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
  },
];

export const categories = ['All', 'Individual', 'Friends', 'Family', 'Events', 'Customized', 'Cakes'];

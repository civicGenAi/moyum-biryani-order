import birianiPoster from '@/assets/biriani-poster.jpeg';
import chocolateCake from '@/assets/chocolate-cake.jpg';
import vanillaCake from '@/assets/vanilla-cake.jpg';
import redVelvetCake from '@/assets/red-velvet-cake.jpg';
import weddingCake from '@/assets/wedding-cake.jpg';
import fruitCake from '@/assets/fruit-cake.jpg';
import caramelCake from '@/assets/caramel-cake.jpg';

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
    description: 'Rich chocolate layers with creamy ganache frosting and chocolate shavings',
    price: 35000,
    image: chocolateCake,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
    isSpecial: true,
  },
  {
    id: '12',
    name: 'Vanilla Birthday Cake',
    description: 'Classic vanilla cake with buttercream frosting and colorful sprinkles',
    price: 30000,
    image: vanillaCake,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
  },
  {
    id: '13',
    name: 'Red Velvet Cake',
    description: 'Velvety soft cake with luxurious cream cheese frosting',
    price: 40000,
    image: redVelvetCake,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
  },
  {
    id: '14',
    name: 'Custom Wedding Cake',
    description: 'Elegant multi-tier cake designed for your special day with floral decorations',
    price: 150000,
    image: weddingCake,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
  },
  {
    id: '15',
    name: 'Fresh Fruit Cake',
    description: 'Light sponge cake topped with fresh berries and cream',
    price: 38000,
    image: fruitCake,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
  },
  {
    id: '16',
    name: 'Caramel Drip Cake',
    description: 'Decadent caramel cake with dripping sauce and caramel candies',
    price: 45000,
    image: caramelCake,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
    isSpecial: true,
  },
  {
    id: '17',
    name: 'Black Forest Cake',
    description: 'Classic German cake with chocolate, cherries, and whipped cream',
    price: 42000,
    image: chocolateCake,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
  },
  {
    id: '18',
    name: 'Cupcake Box (12 pcs)',
    description: 'Assorted flavors - vanilla, chocolate, and red velvet cupcakes',
    price: 25000,
    image: vanillaCake,
    category: 'Cakes',
    productType: 'cakes',
    isAvailable: true,
  },
];

export const categories = ['All', 'Individual', 'Friends', 'Family', 'Events', 'Customized', 'Cakes'];

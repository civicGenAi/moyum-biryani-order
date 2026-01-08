import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/public/Header';
import { MenuCard } from '@/components/public/MenuCard';
import { Footer } from '@/components/public/Footer';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { menuItems, categories } from '@/data/menuItems';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const Menu = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredItems = activeCategory === 'All'
    ? menuItems.filter(item => item.isAvailable)
    : menuItems.filter(item => item.category === activeCategory && item.isAvailable);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header onCartClick={() => setCartOpen(true)} />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground font-heading">
            Full Menu
          </h1>
          <p className="text-muted-foreground text-lg font-body">
            Explore our complete selection of authentic biryani dishes
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${
              sidebarOpen ? 'block' : 'hidden'
            } md:block fixed md:sticky top-20 left-0 w-64 bg-card rounded-2xl p-6 shadow-xl border-2 border-border z-40 md:z-0 h-fit`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-heading">Categories</h3>
              <button
                className="md:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'ghost'}
                  className={`w-full justify-start font-body ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-primary to-orange-600 text-white'
                      : ''
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                    setSidebarOpen(false);
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.aside>

          {/* Menu Grid */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <Button
              className="md:hidden mb-6"
              variant="outline"
              onClick={() => setSidebarOpen(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>

            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, index) => (
                <MenuCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg font-body">
                  No items found in this category
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default Menu;

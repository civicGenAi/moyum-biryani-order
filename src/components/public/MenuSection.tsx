import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MenuCard } from './MenuCard';
import { menuItems, categories } from '@/data/menuItems';
import { Button } from '@/components/ui/button';
import { Utensils } from 'lucide-react';

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filteredItems = activeCategory === 'All'
    ? menuItems.filter(item => item.isAvailable)
    : menuItems.filter(item => item.category === activeCategory && item.isAvailable);

  return (
    <section id="menu" className="py-16 px-4 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Utensils className="w-12 h-12 text-primary mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-orange-600 to-accent bg-clip-text text-transparent">
            Our Delicious Menu
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handcrafted with premium ingredients and authentic spices
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-3 justify-center mb-12 overflow-x-auto pb-2 scrollbar-hide"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={activeCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setActiveCategory(category)}
                className={`font-bold text-base rounded-xl shadow-md transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 shadow-lg shadow-primary/30"
                    : "border-2 border-primary/20 text-foreground hover:bg-primary/10 hover:border-primary/40"
                }`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">No items available in this category</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

import { useState } from 'react';
import { MenuCard } from './MenuCard';
import { menuItems, categories } from '@/data/menuItems';
import { Button } from '@/components/ui/button';

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? menuItems.filter(item => item.isAvailable)
    : menuItems.filter(item => item.category === activeCategory && item.isAvailable);

  return (
    <section id="menu" className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center text-foreground mb-6">Our Menu</h2>
        
        {/* Category Filters */}
        <div className="flex gap-2 justify-center mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category 
                ? "bg-primary hover:bg-primary/90" 
                : "border-primary/30 text-foreground hover:bg-primary/10"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

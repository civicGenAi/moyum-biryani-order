import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { MenuCard } from './MenuCard';
import { menuItems } from '@/data/menuItems';
import { Button } from '@/components/ui/button';
import { Utensils, ArrowRight } from 'lucide-react';
import { useBranch } from '@/contexts/BranchContext';

export const MenuSection = () => {
  const navigate = useNavigate();
  const { selectedBranch } = useBranch();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Filter items based on selected branch's categories
  const filteredItems = menuItems.filter(item => {
    if (!item.isAvailable) return false;
    if (!selectedBranch) return true;
    return selectedBranch.categories.includes(item.productType);
  });

  const displayItems = filteredItems.slice(0, 3);

  return (
    <section id="menu" className="py-16 px-4 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-orange-600 to-accent bg-clip-text text-transparent font-heading">
            Our Delicious Menu
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {displayItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={() => navigate('/menu')}
            size="lg"
            className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 text-white font-bold text-lg px-12 py-6 rounded-2xl shadow-2xl hover:shadow-primary/40 transition-all font-heading group"
          >
            View Full Menu
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { MenuCard } from './MenuCard';
import { menuItems } from '@/data/menuItems';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useBranch } from '@/contexts/BranchContext';
import { useTheme } from '@/contexts/ThemeContext';

export const MenuSection = () => {
  const navigate = useNavigate();
  const { selectedBranch } = useBranch();
  const { theme } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredItems = menuItems.filter(item => {
    if (!item.isAvailable) return false;
    if (!selectedBranch) return true;
    return selectedBranch.categories.includes(item.productType);
  });

  const { productGrid, spacing, borderRadius } = theme.layout;

  // Grid classes based on theme layout
  const gridClass =
    productGrid === '4-col-dense' ? 'grid grid-cols-2 lg:grid-cols-4 gap-3' :
    productGrid === 'masonry-feast' ? 'grid grid-cols-2 md:grid-cols-3 gap-4' :
    productGrid === 'magazine-spread' ? 'flex flex-col gap-0' :
    productGrid === '2-col-hero' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' :
    productGrid === 'list-menu' ? 'flex flex-col gap-3' :
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'; // 3-col-standard default

  const displayCount =
    productGrid === '4-col-dense' ? 8 :
    productGrid === 'magazine-spread' ? 5 :
    productGrid === '2-col-hero' ? 4 :
    3;

  const displayItems = filteredItems.slice(0, displayCount);

  const paddingY = spacing === 'tight' ? 'py-10' : spacing === 'generous' ? 'py-20' : 'py-16';

  const entranceVariants =
    theme.animation.pageEntrance === 'stagger-pop'
      ? { container: { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }, item: { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } } }
      : theme.animation.pageEntrance === 'slide-in'
      ? { container: { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }, item: { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } } }
      : theme.animation.pageEntrance === 'zoom-appetite'
      ? { container: { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }, item: { hidden: { opacity: 0, scale: 1.1 }, show: { opacity: 1, scale: 1 } } }
      : { container: { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }, item: { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } } };

  return (
    <section
      id="menu"
      className={`${paddingY} px-4 relative overflow-hidden`}
      style={{ backgroundColor: theme.colors.background, fontFamily: `var(--theme-font-body)` }}
    >
      {/* Background texture */}
      {theme.decorative.backgroundTexture === 'grain' && (
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
      )}
      {theme.decorative.backgroundTexture === 'dots' && (
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, ${theme.colors.accent} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
      )}
      {theme.decorative.backgroundTexture === 'diagonal-lines' && (
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.primary} 1px, transparent 1px, transparent 12px)` }} />
      )}

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-3"
            style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}
          >
            Our Menu
          </h2>
          <p className="text-base" style={{ color: theme.colors.textMuted }}>{theme.tagline}</p>
        </motion.div>

        <motion.div
          variants={entranceVariants.container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className={gridClass}
        >
          {displayItems.map((item, index) => (
            <motion.div key={item.id} variants={entranceVariants.item}>
              <MenuCard item={item} index={index} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className={`text-center ${spacing === 'tight' ? 'mt-8' : 'mt-12'}`}
        >
          <Button
            onClick={() => navigate('/menu')}
            size="lg"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground, borderRadius, fontFamily: `var(--theme-font-display)` }}
            className="font-bold text-lg px-10 py-6 shadow-xl hover:opacity-90 transition-all group"
          >
            View Full Menu
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

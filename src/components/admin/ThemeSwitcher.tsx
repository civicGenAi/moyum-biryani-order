import { useTheme } from '@/contexts/ThemeContext';
import { FoodTheme } from '@/themes/foodThemes';
import { Check, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeSwitcher = () => {
  const { theme: activeTheme, setTheme, allThemes, isTransitioning } = useTheme();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10">
          <Palette className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Your Store Style</h2>
          <p className="text-sm text-muted-foreground">
            Pick the theme that fits your food. Your products stay the same — only the look changes.
          </p>
        </div>
      </div>

      {/* Currently active badge */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Active theme:</span>
        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
          {activeTheme.emoji} {activeTheme.name}
        </span>
      </div>

      {/* Theme grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-x-auto pb-2">
        {allThemes.map((t, i) => (
          <ThemeCard
            key={t.id}
            theme={t}
            isActive={activeTheme.id === t.id}
            onSelect={() => !isTransitioning && setTheme(t)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

const ThemeCard = ({
  theme,
  isActive,
  onSelect,
  index,
}: {
  theme: FoodTheme;
  isActive: boolean;
  onSelect: () => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onSelect}
      className="relative cursor-pointer rounded-xl overflow-hidden transition-all"
      style={{
        backgroundColor: theme.colors.surface,
        border: isActive
          ? `2px solid ${theme.colors.primary}`
          : `1px solid ${theme.colors.border}`,
        boxShadow: isActive
          ? `0 0 0 3px ${theme.colors.primary}33, 0 4px 20px ${theme.colors.primary}22`
          : '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      {/* Active badge */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-2 right-2 z-10 flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground }}
          >
            <Check className="w-3 h-3" />
            Active
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4">
        {/* Emoji */}
        <div className="text-4xl text-center mb-3">{theme.emoji}</div>

        {/* Name */}
        <p className="font-bold text-sm text-center mb-1" style={{ color: theme.colors.text }}>
          {theme.name}
        </p>

        {/* Tagline */}
        <p className="text-xs text-center mb-2 line-clamp-2 leading-relaxed" style={{ color: theme.colors.textMuted }}>
          {theme.tagline}
        </p>

        {/* Best for */}
        <p className="text-[10px] italic text-center mb-3 line-clamp-2" style={{ color: theme.colors.textMuted }}>
          {theme.bestFor}
        </p>

        {/* Color dots */}
        <div className="flex justify-center gap-1.5 mb-3">
          {[theme.colors.background, theme.colors.primary, theme.colors.accent, theme.colors.highlight].map((color, ci) => (
            <div
              key={ci}
              className="w-4 h-4 rounded-full border border-black/10"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Apply button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full text-xs font-bold py-1.5 rounded-lg transition-all"
          style={{
            backgroundColor: isActive ? theme.colors.primary : theme.colors.accent,
            color: isActive ? theme.colors.primaryForeground : theme.colors.text,
          }}
        >
          {isActive ? '✓ Applied' : 'Apply Theme'}
        </motion.button>
      </div>
    </motion.div>
  );
};

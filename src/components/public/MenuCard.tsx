import { Plus, Minus, Heart, Flame, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/data/menuItems';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { FoodTheme } from '@/themes/foodThemes';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

const PASTEL_PALETTE = ['#FFD6E0', '#FFECD2', '#D4F1F4', '#E8D5F5', '#D5F5E3'];

// Shared Add-to-Cart Controls
const AddToCartControls = ({
  quantity, onAdd, onUpdate, theme, radius, compact = false
}: {
  quantity: number; onAdd: (e: React.MouseEvent) => void;
  onUpdate: (qty: number) => void; theme: FoodTheme; radius: string; compact?: boolean;
}) => {
  if (quantity === 0) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onAdd}
        className="font-bold text-xs px-3 py-1.5 flex items-center gap-1"
        style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground, borderRadius: radius, fontFamily: `var(--theme-font-body)` }}
      >
        <Plus className="w-3 h-3" /> {compact ? '' : 'Add'}
      </motion.button>
    );
  }
  return (
    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-1">
      <button
        onClick={(e) => { e.stopPropagation(); onUpdate(quantity - 1); }}
        className="w-7 h-7 flex items-center justify-center font-bold"
        style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.text, borderRadius: radius, border: `1px solid ${theme.colors.border}` }}
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="font-black text-sm w-6 text-center" style={{ color: theme.colors.primary }}>{quantity}</span>
      <button
        onClick={(e) => { e.stopPropagation(); onUpdate(quantity + 1); }}
        className="w-7 h-7 flex items-center justify-center font-bold"
        style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground, borderRadius: radius }}
      >
        <Plus className="w-3 h-3" />
      </button>
    </motion.div>
  );
};

export const MenuCard = ({ item, index = 0 }: MenuCardProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { cardStyle, borderRadius } = theme.layout;
  const { cardHover, speed } = theme.animation;
  const speedMs = speed === 'instant' ? 0.1 : speed === 'snappy' ? 0.2 : speed === 'smooth' ? 0.4 : 0.6;
  const delay = index * 0.08;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
  };
  const handleCardClick = () => navigate(`/menu/${item.id}`);
  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

  const hoverAnim =
    cardHover === 'bounce' ? { y: -8, scale: 1.03 } :
    cardHover === 'warm-glow' ? { scale: 1.03, filter: 'brightness(1.05)' } :
    cardHover === 'slide-reveal' ? { x: 4, scale: 1.01 } :
    { y: -6, scale: 1.02 };

  const pastelBg = PASTEL_PALETTE[index % PASTEL_PALETTE.length];

  // ─── BOLD POSTER ─────────────────────────────────────────────────────────
  if (cardStyle === 'bold-poster') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: speedMs, delay }}
        whileHover={hoverAnim}
        className="cursor-pointer overflow-hidden"
        style={{ borderRadius, backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}
        onClick={handleCardClick}
      >
        <div className="relative h-44 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" onLoad={() => setImageLoaded(true)} />
          {!imageLoaded && <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: theme.colors.surfaceHover }} />}
          <div className="absolute top-2 right-2 text-xs font-black px-2 py-1" style={{ backgroundColor: theme.colors.accent, color: theme.colors.text, borderRadius: '4px' }}>
            {formatPrice(item.price)}
          </div>
          {item.isSpecial && (
            <div className="absolute top-2 left-2 text-xs font-bold px-2 py-1" style={{ backgroundColor: theme.colors.highlight, color: '#fff', borderRadius }}>🔥 Special</div>
          )}
        </div>
        <div className="p-3">
          <p className="font-black text-base uppercase tracking-wider mb-1" style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}>{item.name}</p>
          <p className="text-xs line-clamp-1 mb-3" style={{ color: theme.colors.textMuted }}>{item.description}</p>
          <AddToCartControls quantity={quantity} onAdd={handleAdd} onUpdate={(qty) => updateQuantity(item.id, qty)} theme={theme} radius={borderRadius} />
        </div>
      </motion.div>
    );
  }

  // ─── POLAROID SNAP ───────────────────────────────────────────────────────
  if (cardStyle === 'polaroid-snap') {
    const rotate = index % 2 === 0 ? '1.5deg' : '-1.5deg';
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: speedMs, delay }}
        whileHover={hoverAnim}
        className="cursor-pointer"
        style={{ transform: `rotate(${rotate})`, backgroundColor: theme.colors.surface, borderRadius, padding: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: `1px solid ${theme.colors.border}` }}
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden mb-3" style={{ borderRadius: '8px', height: '160px', backgroundColor: pastelBg }}>
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          {item.isSpecial && (
            <motion.span animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground }}>★ Special</motion.span>
          )}
        </div>
        <p className="font-bold text-sm mb-1" style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}>{item.name}</p>
        <p className="text-xs mb-2 line-clamp-1" style={{ color: theme.colors.textMuted }}>{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-black px-2 py-0.5 rounded-full" style={{ backgroundColor: theme.colors.highlight + '33', color: theme.colors.primary }}>{formatPrice(item.price)}</span>
          <AddToCartControls quantity={quantity} onAdd={handleAdd} onUpdate={(qty) => updateQuantity(item.id, qty)} theme={theme} radius={borderRadius} compact />
        </div>
      </motion.div>
    );
  }

  // ─── MENU ITEM (horizontal) ───────────────────────────────────────────────
  if (cardStyle === 'menu-item') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: speedMs, delay }}
        whileHover={{ borderLeftWidth: '4px' }}
        className="cursor-pointer flex gap-4 p-4 transition-all"
        style={{ backgroundColor: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}`, borderLeft: `2px solid transparent`, borderRadius }}
        onClick={handleCardClick}
      >
        <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base mb-1" style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}>{item.name}</p>
          <p className="text-xs line-clamp-2 mb-2" style={{ color: theme.colors.textMuted }}>{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold italic" style={{ color: theme.colors.primary }}>{formatPrice(item.price)}</span>
            <AddToCartControls quantity={quantity} onAdd={handleAdd} onUpdate={(qty) => updateQuantity(item.id, qty)} theme={theme} radius={borderRadius} compact />
          </div>
        </div>
      </motion.div>
    );
  }

  // ─── GLASS PLATE ─────────────────────────────────────────────────────────
  if (cardStyle === 'glass-plate') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: speedMs, delay }}
        whileHover={hoverAnim}
        className="cursor-pointer overflow-hidden"
        style={{ borderRadius, backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}`, boxShadow: `0 4px 24px ${theme.colors.accent}22` }}
        onClick={handleCardClick}
      >
        <div className="relative h-40 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ backgroundColor: '#fff', color: theme.colors.primary }}>
            <Leaf className="w-3 h-3" /> Fresh
          </div>
        </div>
        <div className="p-4">
          <p className="font-bold text-base mb-1" style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}>{item.name}</p>
          <p className="text-xs line-clamp-2 mb-3" style={{ color: theme.colors.textMuted }}>{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm px-3 py-1 rounded-full" style={{ backgroundColor: theme.colors.accent + '22', color: theme.colors.primary }}>{formatPrice(item.price)}</span>
            <AddToCartControls quantity={quantity} onAdd={handleAdd} onUpdate={(qty) => updateQuantity(item.id, qty)} theme={theme} radius={borderRadius} compact />
          </div>
        </div>
      </motion.div>
    );
  }

  // ─── CHALKBOARD ───────────────────────────────────────────────────────────
  if (cardStyle === 'chalkboard') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: speedMs, delay }}
        whileHover={hoverAnim}
        className="cursor-pointer overflow-hidden"
        style={{ borderRadius, backgroundColor: theme.colors.surface, border: `2px dashed ${theme.colors.border}`, boxShadow: `inset 0 0 40px rgba(0,0,0,0.3)` }}
        onClick={handleCardClick}
      >
        <div className="relative h-44 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90" />
          {item.isSpecial && (
            <div className="absolute top-2 left-0 text-xs font-bold px-3 py-1" style={{ backgroundColor: theme.colors.accent, color: '#000' }}>TODAY'S SPECIAL</div>
          )}
        </div>
        <div className="p-4" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, rgba(255,255,255,0.05) 24px)' }}>
          <p className="text-base font-bold mb-1" style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{item.name}</p>
          <p className="text-xs mb-3 line-clamp-2" style={{ color: theme.colors.textMuted }}>{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-black text-base" style={{ color: theme.colors.accent }}>{formatPrice(item.price)}</span>
            <AddToCartControls quantity={quantity} onAdd={handleAdd} onUpdate={(qty) => updateQuantity(item.id, qty)} theme={theme} radius={borderRadius} compact />
          </div>
        </div>
      </motion.div>
    );
  }

  // ─── PRICE TAG ────────────────────────────────────────────────────────────
  if (cardStyle === 'price-tag') {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: speedMs, delay }}
        whileHover={hoverAnim}
        className="cursor-pointer overflow-hidden"
        style={{ borderRadius: '0px', backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}
        onClick={handleCardClick}
      >
        <div className="relative h-44 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="px-3 py-1" style={{ backgroundColor: theme.colors.primary }}>
          <p className="text-sm font-bold text-white uppercase tracking-widest truncate" style={{ fontFamily: `var(--theme-font-display)` }}>{item.name}</p>
        </div>
        <div className="p-3 flex items-center justify-between">
          <p className="text-xs line-clamp-1 flex-1 mr-2" style={{ color: theme.colors.textMuted }}>{item.description}</p>
          <span className="font-black text-sm flex-shrink-0" style={{ color: theme.colors.accent }}>{formatPrice(item.price)}</span>
        </div>
        <div className="px-3 pb-3">
          <AddToCartControls quantity={quantity} onAdd={handleAdd} onUpdate={(qty) => updateQuantity(item.id, qty)} theme={theme} radius={borderRadius} />
        </div>
      </motion.div>
    );
  }

  // ─── RECEIPT FOLD ─────────────────────────────────────────────────────────
  if (cardStyle === 'receipt-fold') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: speedMs, delay }}
        whileHover={hoverAnim}
        className="cursor-pointer overflow-hidden relative"
        style={{ borderRadius, backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
        onClick={handleCardClick}
      >
        <div className="absolute bottom-0 right-0 w-0 h-0" style={{ borderStyle: 'solid', borderWidth: '0 0 24px 24px', borderColor: `transparent transparent ${theme.colors.border} transparent` }} />
        <div className="relative h-40 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          {item.isSpecial && (
            <div className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground }}>🏠 Home Made</div>
          )}
        </div>
        <div className="p-4">
          <p className="font-bold text-base mb-1" style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}>{item.name}</p>
          <p className="text-xs line-clamp-2 mb-3" style={{ color: theme.colors.textMuted }}>{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-black text-base" style={{ color: theme.colors.primary }}>{formatPrice(item.price)}</span>
            <AddToCartControls quantity={quantity} onAdd={handleAdd} onUpdate={(qty) => updateQuantity(item.id, qty)} theme={theme} radius={borderRadius} compact />
          </div>
        </div>
      </motion.div>
    );
  }

  // ─── DEFAULT ──────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: speedMs, delay }}
      whileHover={hoverAnim}
      className="cursor-pointer overflow-hidden"
      style={{ borderRadius, backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}`, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
      onClick={handleCardClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        {item.isSpecial && (
          <span className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground }}>
            <Flame className="w-3 h-3" /> Special
          </span>
        )}
        <button className="absolute top-3 right-3 p-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }} onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}>
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
        </button>
      </div>
      <div className="p-4">
        <p className="font-bold text-base mb-1" style={{ fontFamily: `var(--theme-font-display)`, color: theme.colors.text }}>{item.name}</p>
        <p className="text-xs line-clamp-2 mb-3" style={{ color: theme.colors.textMuted }}>{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-black text-base" style={{ color: theme.colors.primary }}>{formatPrice(item.price)}</span>
          <AddToCartControls quantity={quantity} onAdd={handleAdd} onUpdate={(qty) => updateQuantity(item.id, qty)} theme={theme} radius={borderRadius} compact />
        </div>
      </div>
    </motion.div>
  );
};

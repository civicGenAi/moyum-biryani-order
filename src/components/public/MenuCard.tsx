import { Plus, Minus, Heart, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/data/menuItems';
import { useState } from 'react';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

export const MenuCard = ({ item, index = 0 }: MenuCardProps) => {
  const navigate = useNavigate();
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const handleCardClick = () => {
    navigate(`/menu/${item.id}`);
  };

  const formatPrice = (price: number) => {
    return `TZS ${price.toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="group cursor-pointer"
        onClick={handleCardClick}
      >
        <Card className="overflow-hidden bg-card border-0 shadow-lg hover:shadow-2xl transition-all duration-500 relative">
          {/* Gradient border effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
               style={{ padding: '2px', zIndex: -1 }} />

          <div className="relative overflow-hidden">
            {/* Image with zoom effect */}
            <motion.div
              className="relative h-48 overflow-hidden bg-muted"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.1 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-pulse" />
              )}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
              />

              {/* Dark overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1 }
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Quick view button - appears on hover */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                variants={{
                  rest: { opacity: 0, y: 20 },
                  hover: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/95 hover:bg-white backdrop-blur-sm shadow-xl"
                >
                  Quick View
                </Button>
              </motion.div>
            </motion.div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {item.isSpecial && (
                <motion.span
                  className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Flame className="w-3 h-3" />
                  Today's Special
                </motion.span>
              )}
              {item.category === 'spicy' && (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  🌶️ Spicy
                </span>
              )}
            </div>

            {/* Favorite button */}
            <motion.button
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </motion.button>

            {/* Rating stars */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-gray-800">4.8</span>
            </div>
          </div>

          <motion.div
            className="p-5"
            variants={{
              rest: { y: 0 },
              hover: { y: -4 }
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            <div className="flex items-center justify-between">
              <motion.div
                className="flex flex-col"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.05 }
                }}
              >
                <span className="text-xs text-muted-foreground line-through">
                  TZS {(item.price * 1.2).toLocaleString()}
                </span>
                <span className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                  {formatPrice(item.price)}
                </span>
              </motion.div>

              {quantity === 0 ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 text-white font-bold px-6 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-orange-100 px-2 py-1.5 rounded-xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-lg bg-white hover:bg-gray-50 border-2 border-primary/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.id, quantity - 1);
                      }}
                    >
                      <Minus className="h-4 w-4 text-primary" />
                    </Button>
                  </motion.div>
                  <motion.span
                    className="font-bold text-lg w-8 text-center text-primary"
                    key={quantity}
                    initial={{ scale: 1.5, color: "#ea580c" }}
                    animate={{ scale: 1, color: "#ea580c" }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    {quantity}
                  </motion.span>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      size="icon"
                      className="h-9 w-9 rounded-lg bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.id, quantity + 1);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Bottom shine effect */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            variants={{
              rest: { opacity: 0, scaleX: 0 },
              hover: { opacity: 1, scaleX: 1 }
            }}
            transition={{ duration: 0.5 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
};

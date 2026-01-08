import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { menuItems } from '@/data/menuItems';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, Clock, Users, Star, MessageCircle, ChefHat, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

const MenuItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const [reviewData, setReviewData] = useState({
    name: '',
    rating: 5,
    review: ''
  });

  const item = menuItems.find(item => item.id === id);

  useEffect(() => {
    if (!item) {
      navigate('/menu');
    }
  }, [item, navigate]);

  if (!item) {
    return null;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
    }
    toast.success(`Added ${quantity}x ${item.name} to cart`);
    setCartOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to backend
    toast.success('Thank you for your review!');
    setReviewData({ name: '', rating: 5, review: '' });
  };

  const prepTime = item.category === 'Individual' ? '25-30' : item.category === 'Friends' ? '35-40' : '45-50';
  const servings = item.category === 'Individual' ? '1' : item.category === 'Friends' ? '2-3' : item.category === 'Family' ? '4-6' : '10+';

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header onCartClick={() => setCartOpen(true)} />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/menu')}
          className="mb-6 font-body"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[500px] object-cover"
              />
              {item.isSpecial && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold shadow-xl font-heading">
                  🌟 Special
                </div>
              )}
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-2 inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold font-body">
              {item.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground font-heading">
              {item.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed font-body">
              {item.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
                <Clock className="w-8 h-8 text-orange-600 mb-2" />
                <p className="text-sm text-muted-foreground font-body">Prep Time</p>
                <p className="text-2xl font-bold text-foreground font-heading">{prepTime} min</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm text-muted-foreground font-body">Servings</p>
                <p className="text-2xl font-bold text-foreground font-heading">{servings}</p>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="bg-card rounded-2xl p-6 border-2 border-border mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground font-body">Price</p>
                  <p className="text-4xl font-extrabold text-primary font-heading">
                    {item.price === 0 ? 'POA' : `${item.price.toLocaleString()} TZS`}
                  </p>
                </div>
                {item.price > 0 && (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-2xl font-bold w-12 text-center font-heading">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={item.price === 0}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 text-white font-bold text-lg py-6 rounded-2xl shadow-xl font-heading"
              >
                {item.price === 0 ? 'Contact for Custom Order' : 'Add to Cart'}
              </Button>
            </div>

            {/* Need Recipes Button */}
            <Button
              onClick={() => navigate('/contact')}
              variant="outline"
              size="lg"
              className="w-full font-bold text-lg py-6 rounded-2xl font-heading"
            >
              <ChefHat className="w-5 h-5 mr-2" />
              Need Recipes? Contact Us
            </Button>
          </motion.div>
        </div>

        {/* How It's Made Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-primary/5 to-orange-50 rounded-3xl p-8 md:p-12 border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <ChefHat className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-extrabold text-foreground font-heading">How It's Made</h2>
            </div>
            <div className="space-y-4 text-lg text-muted-foreground font-body leading-relaxed">
              <p>
                Our {item.name} is prepared with the utmost care and attention to detail. We start with the finest
                basmati rice, sourced directly from premium farms, and combine it with authentic spices imported
                from the best suppliers.
              </p>
              <p>
                Each dish is slow-cooked using traditional methods passed down through generations. Our chefs
                marinate the chicken with a secret blend of spices for several hours, ensuring every bite is
                packed with flavor.
              </p>
              <p>
                The rice is partially cooked separately and then layered with the marinated chicken, creating
                distinct layers of flavor. Everything is then sealed in a traditional handi (pot) and cooked
                on dum (slow heat) for the perfect finish.
              </p>
              <p className="font-bold text-foreground">
                We use only halal-certified ingredients and maintain the highest standards of hygiene and quality
                throughout the preparation process.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border-2 border-border">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-extrabold text-foreground font-heading">Write a Review</h2>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 font-body">Your Name</label>
                <Input
                  value={reviewData.name}
                  onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                  className="rounded-xl py-6 font-body"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 font-body">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= reviewData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 font-body">Your Review</label>
                <Textarea
                  value={reviewData.review}
                  onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                  placeholder="Tell us about your experience with this dish..."
                  required
                  rows={6}
                  className="rounded-xl font-body"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 text-white font-bold text-lg px-12 py-6 rounded-2xl shadow-xl font-heading"
              >
                Submit Review
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default MenuItemDetail;

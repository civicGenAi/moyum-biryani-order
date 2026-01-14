import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Star, Ticket, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  expiresAt?: Date;
  isRedeemed: boolean;
}

interface Offer {
  id: string;
  title: string;
  code: string;
  discount: string;
  expiresAt: Date;
  minOrder?: number;
}

const Rewards = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [userPoints] = useState(450);
  const nextTierPoints = 500;
  
  const [rewards] = useState<Reward[]>([
    { id: '1', title: 'Free Delivery', description: 'Get free delivery on your next order', points: 100, isRedeemed: false },
    { id: '2', title: '10% Off Order', description: 'Save 10% on your total order', points: 200, isRedeemed: false },
    { id: '3', title: 'Free Biryani Side', description: 'Complimentary raita with any biryani', points: 150, isRedeemed: false },
    { id: '4', title: 'Free Cake Slice', description: 'Free slice of cake of your choice', points: 250, isRedeemed: false },
  ]);

  const [offers] = useState<Offer[]>([
    { id: '1', title: 'Welcome Offer', code: 'WELCOME20', discount: '20% OFF', expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), minOrder: 30000 },
    { id: '2', title: 'Weekend Special', code: 'WEEKEND15', discount: '15% OFF', expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
  ]);

  const handleRedeem = (reward: Reward) => {
    if (userPoints >= reward.points) {
      toast.success(`${reward.title} redeemed! Applied to your next order.`);
    } else {
      toast.error(`You need ${reward.points - userPoints} more points`);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Code ${code} copied!`);
  };

  const daysUntil = (date: Date) => {
    const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold font-heading">Rewards & Offers</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground overflow-hidden relative">
            <div className="absolute -right-8 -top-8 opacity-20">
              <Sparkles className="h-32 w-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm opacity-90">Your Points</span>
              </div>
              <p className="text-4xl font-bold mb-4">{userPoints}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">Next tier: Gold</span>
                  <span>{nextTierPoints - userPoints} pts away</span>
                </div>
                <Progress 
                  value={(userPoints / nextTierPoints) * 100} 
                  className="h-2 bg-primary-foreground/20"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Available Offers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1 font-heading flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            AVAILABLE OFFERS
          </h3>
          <div className="space-y-3">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="p-4 border-dashed border-2 border-primary/30">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                          {offer.discount}
                        </span>
                        <span className="font-semibold text-foreground">{offer.title}</span>
                      </div>
                      {offer.minOrder && (
                        <p className="text-xs text-muted-foreground">Min. order: TZS {offer.minOrder.toLocaleString()}</p>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        <span>Expires in {daysUntil(offer.expiresAt)} days</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyCode(offer.code)}
                      className="font-mono"
                    >
                      {offer.code}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Redeemable Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1 font-heading flex items-center gap-2">
            <Gift className="h-4 w-4" />
            REDEEM REWARDS
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Card 
                  className={`p-4 text-center cursor-pointer transition-all hover:shadow-md ${
                    userPoints >= reward.points ? 'border-primary/50' : 'opacity-60'
                  }`}
                  onClick={() => handleRedeem(reward)}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">{reward.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{reward.description}</p>
                  <div className="flex items-center justify-center gap-1 text-primary font-bold text-sm">
                    <Star className="h-3 w-3 fill-current" />
                    {reward.points} pts
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to earn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 bg-muted/50">
            <h4 className="font-semibold text-foreground mb-3">How to earn points</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Earn 1 point for every TZS 1,000 spent</p>
              <p>• Get 50 bonus points on your birthday</p>
              <p>• Refer a friend and earn 100 points</p>
              <p>• Leave a review and earn 10 points</p>
            </div>
          </Card>
        </motion.div>
      </div>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default Rewards;

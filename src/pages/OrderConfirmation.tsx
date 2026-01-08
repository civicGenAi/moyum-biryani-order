import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Phone, MessageCircle, Home, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import confetti from 'canvas-confetti';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const whatsappNumber = '+255123456789';
  const whatsappMessage = encodeURIComponent(`Hi! I just placed order ${orderNumber} on MOYUM Chicken Biriani`);

  useEffect(() => {
    // Professional confetti celebration
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fire confetti from multiple positions
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ea580c', '#f97316', '#fb923c', '#fdba74']
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ea580c', '#f97316', '#fb923c', '#fdba74']
      });
    }, 250);

    // Additional burst effect
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#f97316', '#fb923c', '#fdba74', '#fef3c7']
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-background via-orange-50/30 to-background flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-lg p-10 text-center shadow-2xl border-2 border-primary/20 rounded-3xl bg-gradient-to-br from-card to-orange-50/30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
            className="mb-8"
          >
            <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle className="h-16 w-16 text-white" strokeWidth={2.5} />
            </div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h1 className="text-4xl font-extrabold text-foreground mb-3 font-heading bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-muted-foreground font-body">Thank you for choosing MOYUM Biryani</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary/10 to-orange-100/50 rounded-2xl p-6 mb-8 border-2 border-primary/20"
          >
            <p className="text-sm text-muted-foreground mb-2 font-body">Order Number</p>
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="text-3xl font-extrabold text-primary font-heading"
            >
              {orderNumber}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-3 text-muted-foreground mb-8 bg-background/60 backdrop-blur-sm rounded-2xl p-4"
          >
            <Clock className="h-6 w-6 text-primary" />
            <span className="text-base font-semibold font-body">Estimated Delivery: 30-45 minutes</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full gap-3 py-6 rounded-xl border-2 hover:border-green-500 hover:bg-green-50 transition-all font-body text-base font-semibold"
              >
                <MessageCircle className="h-5 w-5 text-green-600" />
                Contact via WhatsApp
              </Button>
            </a>

            <a href={`tel:${whatsappNumber}`} className="block">
              <Button
                variant="outline"
                className="w-full gap-3 py-6 rounded-xl border-2 hover:border-blue-500 hover:bg-blue-50 transition-all font-body text-base font-semibold"
              >
                <Phone className="h-5 w-5 text-blue-600" />
                Call Us
              </Button>
            </a>

            <Button
              onClick={() => navigate('/')}
              className="w-full gap-3 py-6 rounded-xl bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 font-bold text-base shadow-xl font-heading"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground font-body"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>We're preparing your delicious biryani!</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default OrderConfirmation;

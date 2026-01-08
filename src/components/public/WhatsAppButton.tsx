import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappNumber = '+255123456789';
  const message = 'Hi! I would like to order from MOYUM Chicken Biryani';

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-28 md:bottom-24 right-4 md:right-8 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-foreground px-4 py-3 rounded-2xl shadow-2xl whitespace-nowrap border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Need help? Chat with us!</span>
              <button
                onClick={() => setShowTooltip(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Arrow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white dark:border-l-gray-800" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        className="relative bg-[#25D366] hover:bg-[#20BA5A] text-white p-5 rounded-full shadow-2xl group overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1
        }}
      >
        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1
          }}
        />

        {/* Icon */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 3
          }}
        >
          <MessageCircle className="w-7 h-7 relative z-10" strokeWidth={2.5} />
        </motion.div>

        {/* Notification badge */}
        <motion.div
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          1
        </motion.div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2
          }}
        />
      </motion.button>

      {/* Greeting tooltip on first load */}
      <AnimatePresence>
        {!showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 20 }}
            transition={{ delay: 2 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white px-4 py-3 rounded-2xl shadow-2xl text-sm font-semibold whitespace-nowrap"
            onAnimationComplete={() => {
              setTimeout(() => {
                const element = document.querySelector('.whatsapp-greeting');
                if (element) {
                  element.remove();
                }
              }, 5000);
            }}
          >
            <span className="whatsapp-greeting">👋 Have questions? Chat now!</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#20BA5A]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { motion } from 'framer-motion';
import { ShoppingCart, FileText, CreditCard, CheckCircle } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: number; // 1-4
}

const steps = [
  { icon: ShoppingCart, label: 'Cart', number: 1 },
  { icon: FileText, label: 'Details', number: 2 },
  { icon: CreditCard, label: 'Payment', number: 3 },
  { icon: CheckCircle, label: 'Confirm', number: 4 }
];

export const CheckoutProgress = ({ currentStep }: CheckoutProgressProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6 shadow-lg border border-border">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-muted -z-10 mx-8" />
        <motion.div
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-primary to-orange-600 -z-10 mx-8"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {steps.map((step, index) => {
          const isActive = currentStep >= step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 relative ${
                  isActive
                    ? 'bg-gradient-to-br from-primary to-orange-600 text-white shadow-lg'
                    : 'bg-muted text-muted-foreground'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
              >
                <step.icon className="w-5 h-5" strokeWidth={2.5} />

                {/* Pulse effect for current step */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
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
                )}

                {/* Checkmark for completed steps */}
                {isActive && !isCurrent && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <CheckCircle className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.div>

              <motion.span
                className={`text-xs md:text-sm font-medium text-center ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {step.label}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

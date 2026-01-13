import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { FileText, ShoppingCart, RefreshCw, AlertCircle, Scale, CheckCircle } from 'lucide-react';
import { useBranch } from '@/contexts/BranchContext';

const TermsOfService = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { selectedBranch } = useBranch();

  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: 'By accessing and using the MOYUM Biryani website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: ShoppingCart,
      title: 'Orders and Payment',
      content: 'All orders are subject to availability and confirmation. We reserve the right to refuse or cancel any order for any reason. Prices are subject to change without notice. Payment must be made at the time of order placement through our accepted payment methods.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: RefreshCw,
      title: 'Cancellation and Refunds',
      content: 'Orders can be cancelled within 5 minutes of placement for a full refund. After preparation has begun, orders cannot be cancelled. If there is an issue with your order, please contact us immediately and we will work to resolve it.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: AlertCircle,
      title: 'Delivery and Pickup',
      content: 'Delivery times are estimates and may vary based on traffic and weather conditions. We are not liable for delays beyond our reasonable control. For pickup orders, please arrive within 15 minutes of the scheduled time to ensure food quality.',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Scale,
      title: 'Limitation of Liability',
      content: 'MOYUM Biryani shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount you paid for the order in question.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header onCartClick={() => setCartOpen(true)} />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FileText className="w-16 h-16 text-primary mx-auto" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-foreground font-heading">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-muted-foreground mt-4 font-body">
            Last updated: January 2026
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-primary/10 to-orange-50 rounded-3xl p-8 md:p-12 border-2 border-primary/20">
            <p className="text-lg text-muted-foreground leading-relaxed font-body">
              Welcome to MOYUM Biryani! These Terms of Service govern your use of our website and services. By placing an order or using our services, you agree to comply with and be bound by these terms. We reserve the right to update these terms at any time, and your continued use of our services constitutes acceptance of any changes.
            </p>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className={`${section.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-${section.color.replace('text-', '')}/20`}>
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-2xl bg-white shadow-lg`}>
                    <section.icon className={`w-8 h-8 ${section.color}`} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-extrabold mb-4 text-foreground font-heading">
                      {section.title}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed font-body">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* User Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border-2 border-border shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-foreground font-heading">
              User Responsibilities
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6 font-body">
              When using our services, you agree to:
            </p>
            <div className="space-y-4 font-body">
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">•</span>
                <p className="text-muted-foreground">Provide accurate and complete information when placing orders</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">•</span>
                <p className="text-muted-foreground">Be available to receive delivery or pick up your order at the specified time</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">•</span>
                <p className="text-muted-foreground">Not use our services for any unlawful or fraudulent purposes</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">•</span>
                <p className="text-muted-foreground">Maintain the confidentiality of your account information</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">•</span>
                <p className="text-muted-foreground">Notify us immediately of any issues with your order</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Food Quality and Safety */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border-2 border-border shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-foreground font-heading">
              Food Quality and Safety
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4 font-body">
              We are committed to providing high-quality, safe food prepared under strict hygiene standards. All our ingredients are halal-certified and sourced from trusted suppliers.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed font-body">
              If you have any food allergies or dietary restrictions, please contact us before placing your order. While we take precautions to prevent cross-contamination, we cannot guarantee that our food is completely free from allergens.
            </p>
          </div>
        </motion.div>

        {/* Intellectual Property */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border-2 border-border shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-foreground font-heading">
              Intellectual Property
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-body">
              All content on the MOYUM Biryani website, including text, images, logos, and designs, is the property of MOYUM Biryani and is protected by copyright and trademark laws. You may not use, copy, or distribute any content without our express written permission.
            </p>
          </div>
        </motion.div>

        {/* Governing Law */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border-2 border-border shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-foreground font-heading">
              Governing Law
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-body">
              These Terms of Service shall be governed by and construed in accordance with the laws of the United Republic of Tanzania. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Tanzania.
            </p>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/10 to-orange-100/50 rounded-3xl p-8 md:p-12 border-2 border-primary/20 text-center">
            <h2 className="text-3xl font-extrabold mb-4 text-foreground font-heading">
              Questions About Our Terms?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 font-body">
              If you have any questions or concerns about our Terms of Service, please contact us.
            </p>
            <div className="space-y-2 font-body">
              <p className="text-base"><strong>Email:</strong> hello@moyumbiryani.co.tz</p>
              <p className="text-base"><strong>Phone:</strong> {selectedBranch?.phone || '+255 123 456 789'}</p>
              <p className="text-base"><strong>Address:</strong> {selectedBranch?.address || 'Dar es Salaam, Tanzania'}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default TermsOfService;

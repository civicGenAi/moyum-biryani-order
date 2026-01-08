import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { Shield, Lock, Eye, UserCheck, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: 'We collect information that you provide directly to us, including your name, email address, phone number, delivery address, and payment information when you place an order. We also collect information about your device and how you interact with our website.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: 'We use the information we collect to process your orders, communicate with you about your orders, improve our services, send you marketing communications (with your consent), and comply with legal obligations. We never sell your personal information to third parties.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment information is processed through secure payment gateways and we do not store your complete payment card details.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: 'We may share your information with service providers who assist us in operating our website and providing our services (such as payment processors and delivery partners). We require these parties to protect your information and only use it for the purposes we specify.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. To exercise these rights, please contact us at hello@moyumbiryani.co.tz. You can opt out of marketing communications at any time.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
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
            <Shield className="w-16 h-16 text-primary mx-auto" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-foreground font-heading">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
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
              At MOYUM Biryani, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully.
            </p>
          </div>
        </motion.div>

        {/* Policy Sections */}
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

        {/* Cookies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border-2 border-border shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-foreground font-heading">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6 font-body">
              We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us remember your preferences and improve our services.
            </p>
            <div className="space-y-4 font-body">
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">•</span>
                <p className="text-muted-foreground"><strong>Essential Cookies:</strong> Required for the website to function properly</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">•</span>
                <p className="text-muted-foreground"><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">•</span>
                <p className="text-muted-foreground"><strong>Preference Cookies:</strong> Remember your settings and preferences</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Retention */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border-2 border-border shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-foreground font-heading">
              Data Retention
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-body">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/10 to-orange-100/50 rounded-3xl p-8 md:p-12 border-2 border-primary/20 text-center">
            <h2 className="text-3xl font-extrabold mb-4 text-foreground font-heading">
              Questions About Privacy?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 font-body">
              If you have any questions or concerns about our Privacy Policy, please don't hesitate to contact us.
            </p>
            <div className="space-y-2 font-body">
              <p className="text-base"><strong>Email:</strong> hello@moyumbiryani.co.tz</p>
              <p className="text-base"><strong>Phone:</strong> +255 123 456 789</p>
              <p className="text-base"><strong>Address:</strong> Kaloleni Area, Arusha, Tanzania</p>
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

export default PrivacyPolicy;

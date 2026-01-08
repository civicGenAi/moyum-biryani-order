import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  ArrowUp,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/logo.jpeg';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <img src={logo} alt="MOYUM Logo" className="w-14 h-14 rounded-xl shadow-lg" />
              <div>
                <h3 className="text-2xl font-extrabold text-primary">MOYUM</h3>
                <p className="text-sm text-secondary-foreground/80">Chicken Biryani</p>
              </div>
            </div>
            <p className="text-secondary-foreground/70 leading-relaxed">
              Authentic flavors, crafted with love. Experience the taste of tradition with every
              bite of our premium biryani.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
                { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
                { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
                { icon: MessageCircle, href: '#', color: 'hover:bg-green-600' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`bg-white/10 backdrop-blur-sm p-3 rounded-full ${social.color} transition-all shadow-lg`}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6 text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Menu', to: '/#menu' },
                { label: 'My Orders', to: '/orders' },
                { label: 'About Us', to: '/' },
                { label: 'FAQs', to: '/' },
                { label: 'Contact', to: '/' },
                { label: 'Admin Dashboard', to: '/admin' }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                      whileHover={{ x: 5 }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6 text-primary">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/70 text-sm leading-relaxed">
                  123 Biryani Street, Kariakoo
                  <br />
                  Dar es Salaam, Tanzania
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+255123456789"
                  className="text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  +255 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@moyum.co.tz"
                  className="text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  info@moyum.co.tz
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-secondary-foreground/70 text-sm">
                  <p className="font-semibold text-secondary-foreground mb-1">Opening Hours:</p>
                  <p>Mon - Sun: 11:00 AM - 11:00 PM</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6 text-primary">Stay Updated</h4>
            <p className="text-secondary-foreground/70 text-sm mb-4">
              Subscribe to get special offers, updates, and delicious recipes!
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-secondary-foreground placeholder:text-secondary-foreground/50 backdrop-blur-sm"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                Subscribe
              </Button>
            </form>

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-sm text-secondary-foreground/70 mb-3">We Accept:</p>
              <div className="flex gap-2 flex-wrap">
                {['M-PESA', 'CASH', 'CARD'].map((method, index) => (
                  <span
                    key={index}
                    className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-secondary-foreground/60 text-center md:text-left"
          >
            © {new Date().getFullYear()} MOYUM Chicken Biryani. All rights reserved. Made with{' '}
            <Heart className="w-4 h-4 inline fill-red-500 text-red-500" /> in Tanzania
          </motion.p>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-2xl z-40"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

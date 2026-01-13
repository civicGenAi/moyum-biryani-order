import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { BottomNav } from '@/components/public/BottomNav';
import { CartSheet } from '@/components/public/CartSheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useBranch } from '@/contexts/BranchContext';

const Contact = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { selectedBranch } = useBranch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to backend
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: selectedBranch?.address || 'Dar es Salaam, Tanzania',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: selectedBranch?.phone || '+255 123 456 789',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@moyumbiryani.co.tz',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: `${selectedBranch?.openingTime || '10:00'} - ${selectedBranch?.closingTime || '22:00'}`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200'
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
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-foreground font-heading">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Have questions about our menu, recipes, or catering services? We'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className={`${info.bgColor} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${info.borderColor} h-full`}>
                <motion.div
                  className="mb-4"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 inline-block shadow-lg">
                    <info.icon className={`w-8 h-8 ${info.iconColor}`} strokeWidth={2} />
                  </div>
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-foreground font-heading">{info.title}</h3>
                <p className="text-muted-foreground font-body">{info.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-3xl p-8 md:p-12 border-2 border-border shadow-xl">
              <h2 className="text-3xl font-extrabold mb-6 text-foreground font-heading">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 font-body">Full Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="rounded-xl py-6 font-body"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 font-body">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="rounded-xl py-6 font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 font-body">Phone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+255 123 456 789"
                      required
                      className="rounded-xl py-6 font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 font-body">Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Recipe inquiry, Catering, General question..."
                    required
                    className="rounded-xl py-6 font-body"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 font-body">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need..."
                    required
                    rows={6}
                    className="rounded-xl font-body"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 text-white font-bold text-lg py-6 rounded-2xl shadow-xl font-heading"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Map & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Map placeholder */}
            <div className="bg-gradient-to-br from-primary/10 to-orange-50 rounded-3xl p-8 border-2 border-primary/20 shadow-xl h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 font-heading">Visit Us</h3>
                <p className="text-muted-foreground font-body">
                  {selectedBranch?.address || 'Dar es Salaam, Tanzania'}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-card rounded-3xl p-8 border-2 border-border shadow-xl">
              <h3 className="text-2xl font-extrabold mb-4 text-foreground font-heading">
                Why Contact Us?
              </h3>
              <ul className="space-y-3 text-muted-foreground font-body">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Request custom recipes and cooking instructions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Inquire about catering services for events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Ask about our ingredients and preparation methods</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Discuss bulk orders and corporate packages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Share feedback to help us improve</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <BottomNav onCartClick={() => setCartOpen(true)} />
    </div>
  );
};

export default Contact;

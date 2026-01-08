import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Phone, MessageCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const whatsappNumber = '+255123456789'; // Replace with actual number
  const whatsappMessage = encodeURIComponent(`Hi! I just placed order ${orderNumber} on MOYUM Chicken Biriani`);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Placed!</h1>
          <p className="text-muted-foreground">Thank you for your order</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-1">Order Number</p>
          <p className="text-xl font-bold text-primary">{orderNumber}</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
          <Clock className="h-5 w-5" />
          <span>Estimated: 30-45 minutes</span>
        </div>

        <div className="space-y-3">
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" className="w-full gap-2">
              <MessageCircle className="h-5 w-5 text-accent" />
              Contact via WhatsApp
            </Button>
          </a>
          
          <a href={`tel:${whatsappNumber}`} className="block">
            <Button variant="outline" className="w-full gap-2">
              <Phone className="h-5 w-5" />
              Call Us
            </Button>
          </a>

          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-primary hover:bg-primary/90 gap-2"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderConfirmation;

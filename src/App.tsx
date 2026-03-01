import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { BranchProvider } from "@/contexts/BranchContext";

// Public pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuItemDetail from "./pages/MenuItemDetail";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import SavedPhones from "./pages/SavedPhones";
import SavedAddresses from "./pages/SavedAddresses";
import Favorites from "./pages/Favorites";
import Rewards from "./pages/Rewards";
import PaymentMethods from "./pages/PaymentMethods";
import AppSettings from "./pages/AppSettings";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminDiscounts from "./pages/admin/AdminDiscounts";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminBranches from "./pages/admin/AdminBranches";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BranchProvider>
          <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/:id" element={<MenuItemDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/phones" element={<SavedPhones />} />
              <Route path="/profile/addresses" element={<SavedAddresses />} />
              <Route path="/profile/favorites" element={<Favorites />} />
              <Route path="/profile/rewards" element={<Rewards />} />
              <Route path="/profile/payments" element={<PaymentMethods />} />
              <Route path="/profile/settings" element={<AppSettings />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="discounts" element={<AdminDiscounts />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="branches" element={<AdminBranches />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </CartProvider>
        </BranchProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

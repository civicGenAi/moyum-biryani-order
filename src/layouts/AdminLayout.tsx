import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('products')) return 'Products';
    if (path.includes('orders')) return 'Orders';
    if (path.includes('discounts')) return 'Discounts';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
            <div className="px-4 py-3 flex items-center gap-4">
              <SidebarTrigger className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
              <h1 className="text-lg font-bold">{getPageTitle()}</h1>
            </div>
          </header>
          
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

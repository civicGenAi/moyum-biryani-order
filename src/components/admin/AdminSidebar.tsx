import { LayoutDashboard, Package, ClipboardList, Percent, Settings, Home } from 'lucide-react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import logo from '@/assets/logo.jpeg';

const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Products', url: '/admin/products', icon: Package },
  { title: 'Orders', url: '/admin/orders', icon: ClipboardList },
  { title: 'Discounts', url: '/admin/discounts', icon: Percent },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export const AdminSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <RouterNavLink to="/admin" className="flex items-center gap-3">
          <img src={logo} alt="MOYUM" className="h-10 w-10 rounded-full object-cover" />
          {!collapsed && (
            <div>
              <h1 className="font-bold text-sidebar-foreground">MOYUM</h1>
              <p className="text-xs text-sidebar-foreground/70">Admin Panel</p>
            </div>
          )}
        </RouterNavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <RouterNavLink
                      to={item.url}
                      end={item.url === '/admin'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </RouterNavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <RouterNavLink
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    {!collapsed && <span>Back to Store</span>}
                  </RouterNavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

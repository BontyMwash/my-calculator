import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardList,
  BarChart,
  User,
  LogOut,
  Menu,
  X } from
'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardLayout = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.'
    });
    navigate('/');
  };

  const navItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="mr-2 h-4 w-4" data-id="ywa8yga0e" data-path="src/components/layout/DashboardLayout.tsx" />,
    allowedRoles: ['admin', 'teacher', 'student']
  },
  {
    name: 'Students',
    path: '/dashboard/students',
    icon: <Users className="mr-2 h-4 w-4" data-id="4j506zkrs" data-path="src/components/layout/DashboardLayout.tsx" />,
    allowedRoles: ['admin', 'teacher']
  },
  {
    name: 'User Management',
    path: '/dashboard/users',
    icon: <User className="mr-2 h-4 w-4" data-id="ku0ql38h4" data-path="src/components/layout/DashboardLayout.tsx" />,
    allowedRoles: ['admin']
  },
  {
    name: 'Marks',
    path: '/dashboard/marks',
    icon: <ClipboardList className="mr-2 h-4 w-4" data-id="sorniqemr" data-path="src/components/layout/DashboardLayout.tsx" />,
    allowedRoles: ['admin', 'teacher']
  },
  {
    name: 'Student Performance',
    path: '/dashboard/performance',
    icon: <GraduationCap className="mr-2 h-4 w-4" data-id="qf18by1jw" data-path="src/components/layout/DashboardLayout.tsx" />,
    allowedRoles: ['admin', 'teacher', 'student']
  },
  {
    name: 'Analysis',
    path: '/dashboard/analysis',
    icon: <BarChart className="mr-2 h-4 w-4" data-id="0s2wja5bb" data-path="src/components/layout/DashboardLayout.tsx" />,
    allowedRoles: ['admin', 'teacher']
  }];


  const filteredNavItems = navItems.filter((item) =>
  user && user.role ? item.allowedRoles.includes(user.role) : false
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row" data-id="lujcqecol" data-path="src/components/layout/DashboardLayout.tsx">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between" data-id="sy3iq8jdd" data-path="src/components/layout/DashboardLayout.tsx">
        <div className="flex items-center" data-id="k7syf6xgu" data-path="src/components/layout/DashboardLayout.tsx">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} data-id="6bjyic5yr" data-path="src/components/layout/DashboardLayout.tsx">
            {sidebarOpen ? <X size={20} data-id="1gc2mrmvz" data-path="src/components/layout/DashboardLayout.tsx" /> : <Menu size={20} data-id="r14nmpq8q" data-path="src/components/layout/DashboardLayout.tsx" />}
          </Button>
          <h1 className="text-xl font-bold ml-2" data-id="x4ziukc9k" data-path="src/components/layout/DashboardLayout.tsx">Student Management</h1>
        </div>
        <Avatar className="h-8 w-8" data-id="dz2yfcfc3" data-path="src/components/layout/DashboardLayout.tsx">
          <AvatarFallback data-id="fo86q7nby" data-path="src/components/layout/DashboardLayout.tsx">{user?.Name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
        sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white border-r transition-all duration-300 z-10 ${

        isMobile ? 'absolute inset-0' : ''}`
        } data-id="q4wgvv8ez" data-path="src/components/layout/DashboardLayout.tsx">

        <div className="p-4" data-id="p5e84bxly" data-path="src/components/layout/DashboardLayout.tsx">
          <h1 className="text-xl font-bold hidden md:block" data-id="a8ekre3dx" data-path="src/components/layout/DashboardLayout.tsx">Student Management</h1>
          <div className="mt-6 space-y-1" data-id="fyq7t03zt" data-path="src/components/layout/DashboardLayout.tsx">
            {filteredNavItems.map((item) =>
            <Link key={item.path} to={item.path} data-id="q1svifz91" data-path="src/components/layout/DashboardLayout.tsx">
                <Button
                variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                className="w-full justify-start" data-id="k363qd8y1" data-path="src/components/layout/DashboardLayout.tsx">

                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            )}
            <Separator className="my-4" data-id="cv2wzemug" data-path="src/components/layout/DashboardLayout.tsx" />
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout} data-id="9zq851e5r" data-path="src/components/layout/DashboardLayout.tsx">

              <LogOut className="mr-2 h-4 w-4" data-id="tt8mqwcu1" data-path="src/components/layout/DashboardLayout.tsx" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto" data-id="el30ipr89" data-path="src/components/layout/DashboardLayout.tsx">
        <Outlet data-id="daf4axc88" data-path="src/components/layout/DashboardLayout.tsx" />
      </main>
    </div>);

};

export default DashboardLayout;
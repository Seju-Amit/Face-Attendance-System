import { useState, useEffect, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  Users,
  Calendar,
  Settings,
  Camera,
  FileText,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  UserPlus,
  UserCheck,
  PieChart,
  ListFilter,
  BarChart,
  Bell,
  FileBarChart,
  User,
  Shield,
  Key,
  BookOpen,
  Clock,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface SidebarSubItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path: string;
  allowedRoles: string[];
  subItems?: SidebarSubItem[];
}

// Define sidebar items outside of component for better performance
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/dashboard",
    allowedRoles: ["admin", "sub-admin", "student"],
  },
  {
    title: "My Profile",
    icon: User,
    path: "/profile",
    allowedRoles: ["admin", "sub-admin", "student"],
    subItems: [
      {
        title: "Personal Info",
        icon: User,
        path: "/profile/info"
      },
      {
        title: "Change Password",
        icon: Key,
        path: "/profile/password"
      },
      {
        title: "My Activity",
        icon: History,
        path: "/profile/activity"
      }
    ]
  },
  {
    title: "User Management",
    icon: Users,
    path: "/users",
    allowedRoles: ["admin"],
    subItems: [
      {
        title: "Add Users",
        icon: UserPlus,
        path: "/users/add"
      },
      {
        title: "Manage Users",
        icon: UserCheck,
        path: "/users/manage"
      }
    ]
  },
  {
    title: "Face Recognition",
    icon: Camera,
    path: "/face-recognition",
    allowedRoles: ["admin", "sub-admin"],
    subItems: [
      {
        title: "Register Face",
        icon: Camera,
        path: "/face-recognition/register"
      },
      {
        title: "Verification",
        icon: UserCheck,
        path: "/face-recognition/verify"
      }
    ]
  },
  {
    title: "Attendance",
    icon: Calendar,
    path: "/attendance",
    allowedRoles: ["admin", "sub-admin", "student"],
    subItems: [
      {
        title: "Mark Attendance",
        icon: UserCheck,
        path: "/attendance/mark"
      },
      {
        title: "View Records",
        icon: FileText,
        path: "/attendance/records"
      }
    ]
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/reports",
    allowedRoles: ["admin", "sub-admin"],
    subItems: [
      {
        title: "Daily Reports",
        icon: FileBarChart,
        path: "/reports/daily"
      },
      {
        title: "Monthly Analysis",
        icon: BarChart,
        path: "/reports/monthly"
      },
      {
        title: "Statistics",
        icon: PieChart,
        path: "/reports/statistics"
      }
    ]
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
    allowedRoles: ["admin", "sub-admin", "student"],
  },
];

// Wrapper component for sidebar items with tooltip when collapsed
const SidebarItemWithTooltip = ({ 
  children, 
  title, 
  showTooltip 
}: { 
  children: ReactNode, 
  title: string,
  showTooltip: boolean
}) => {
  if (!showTooltip) return <>{children}</>;
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-sidebar-accent text-sidebar-foreground border-sidebar-border">
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar = ({ isMobile, isOpen, setIsOpen }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Get role-specific dashboard path
  const getDashboardPath = () => {
    if (!user) return "/dashboard";
    
    switch (user.role) {
      case "admin":
        return "/admin/dashboard";
      case "sub-admin":
        return "/subadmin/dashboard";
      case "student":
        return "/student/dashboard";
      default:
        return "/dashboard";
    }
  };

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  
  // Check if current path is in a section's subItems
  const isActiveSection = (item: SidebarItem) => {
    if (!item.subItems) return false;
    return item.subItems.some(subItem => location.pathname === subItem.path);
  };
  
  // Filter and transform items based on user role
  const filteredItems = sidebarItems.filter((item) =>
    user ? item.allowedRoles.includes(user.role) : false
  ).map(item => {
    // Replace dashboard path with role-specific path
    if (item.title === "Dashboard") {
      return {
        ...item,
        path: getDashboardPath()
      };
    }
    return item;
  });

  // Auto-expand sections on load if they contain the active route
  useEffect(() => {
    filteredItems.forEach(item => {
      if (isActiveSection(item)) {
        setExpandedItems(prev => ({
          ...prev,
          [item.title]: true
        }));
      }
    });
  }, [location.pathname, user]);

  // Check if a path is active, considering role-specific dashboard paths
  const isActivePath = (path: string) => {
    // For dashboard specifically
    if (path.includes("/dashboard")) {
      const dashboardPath = getDashboardPath();
      return location.pathname === dashboardPath || location.pathname === path;
    }
    
    // For other paths
    return location.pathname === path;
  };

  const handleCloseSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Dynamic role-specific quick actions
  const getRoleSpecificActions = () => {
    if (!user) return null;
    
    // For collapsed sidebar, just show icons
    if (!isOpen && !isMobile) {
      switch (user.role) {
        case "admin":
          return (
            <div className="py-2 space-y-1 flex flex-col items-center border-t border-sidebar-border">
              <SidebarItemWithTooltip title="Add New User" showTooltip={!isOpen && !isMobile}>
                <Link 
                  to="/users/add" 
                  className="p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  onClick={handleCloseSidebar}
                >
                  <UserPlus className="h-5 w-5" />
                </Link>
              </SidebarItemWithTooltip>
              
              <SidebarItemWithTooltip title="Today's Report" showTooltip={!isOpen && !isMobile}>
                <Link 
                  to="/reports/daily" 
                  className="p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  onClick={handleCloseSidebar}
                >
                  <FileBarChart className="h-5 w-5" />
                </Link>
              </SidebarItemWithTooltip>
            </div>
          );
        case "sub-admin":
          return (
            <div className="py-2 space-y-1 flex flex-col items-center border-t border-sidebar-border">
              <SidebarItemWithTooltip title="Register New Face" showTooltip={!isOpen && !isMobile}>
                <Link 
                  to="/face-recognition/register" 
                  className="p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  onClick={handleCloseSidebar}
                >
                  <Camera className="h-5 w-5" />
                </Link>
              </SidebarItemWithTooltip>
              
              <SidebarItemWithTooltip title="Today's Attendance" showTooltip={!isOpen && !isMobile}>
                <Link 
                  to="/attendance/records" 
                  className="p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  onClick={handleCloseSidebar}
                >
                  <Clock className="h-5 w-5" />
                </Link>
              </SidebarItemWithTooltip>
            </div>
          );
        case "student":
          return (
            <div className="py-2 space-y-1 flex flex-col items-center border-t border-sidebar-border">
              <SidebarItemWithTooltip title="Mark Attendance" showTooltip={!isOpen && !isMobile}>
                <Link 
                  to="/attendance/mark" 
                  className="p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  onClick={handleCloseSidebar}
                >
                  <Calendar className="h-5 w-5" />
                </Link>
              </SidebarItemWithTooltip>
              
              <SidebarItemWithTooltip title="My Attendance History" showTooltip={!isOpen && !isMobile}>
                <Link 
                  to="/attendance/records" 
                  className="p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  onClick={handleCloseSidebar}
                >
                  <History className="h-5 w-5" />
                </Link>
              </SidebarItemWithTooltip>
            </div>
          );
        default:
          return null;
      }
    }
    
    // For expanded sidebar (original)
    switch (user.role) {
      case "admin":
        return (
          <div className="p-4 space-y-3 border-t border-sidebar-border">
            <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/60 tracking-wider">Admin Tools</h3>
            <Link 
              to="/users/add" 
              className="flex items-center text-sm py-1.5 text-sidebar-foreground hover:text-sidebar-primary transition-colors"
              onClick={handleCloseSidebar}
            >
              <UserPlus className="h-4 w-4 mr-3" />
              Add New User
            </Link>
            <Link 
              to="/reports/daily" 
              className="flex items-center text-sm py-1.5 text-sidebar-foreground hover:text-sidebar-primary transition-colors"
              onClick={handleCloseSidebar}
            >
              <FileBarChart className="h-4 w-4 mr-3" />
              Today's Report
            </Link>
          </div>
        );
      case "sub-admin":
        return (
          <div className="p-4 space-y-3 border-t border-sidebar-border">
            <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/60 tracking-wider">Quick Actions</h3>
            <Link 
              to="/face-recognition/register" 
              className="flex items-center text-sm py-1.5 text-sidebar-foreground hover:text-sidebar-primary transition-colors"
              onClick={handleCloseSidebar}
            >
              <Camera className="h-4 w-4 mr-3" />
              Register New Face
            </Link>
            <Link 
              to="/attendance/records" 
              className="flex items-center text-sm py-1.5 text-sidebar-foreground hover:text-sidebar-primary transition-colors"
              onClick={handleCloseSidebar}
            >
              <Clock className="h-4 w-4 mr-3" />
              Today's Attendance
            </Link>
          </div>
        );
      case "student":
        return (
          <div className="p-4 space-y-3 border-t border-sidebar-border">
            <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/60 tracking-wider">Quick Actions</h3>
            <Link 
              to="/attendance/mark" 
              className="flex items-center text-sm py-1.5 text-sidebar-foreground hover:text-sidebar-primary transition-colors"
              onClick={handleCloseSidebar}
            >
              <Calendar className="h-4 w-4 mr-3" />
              Mark Attendance 
            </Link>
            <Link 
              to="/attendance/records" 
              className="flex items-center text-sm py-1.5 text-sidebar-foreground hover:text-sidebar-primary transition-colors"
              onClick={handleCloseSidebar}
            >
              <History className="h-4 w-4 mr-3" />
              My Attendance History
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  // Render sidebar items in collapsed mode
  const renderCollapsedSidebarItems = () => {
    return (
      <nav className="px-1 space-y-4 py-4 flex flex-col items-center">
        {filteredItems.map((item) => (
          <div key={item.path} className="w-full flex flex-col items-center">
            {item.subItems ? (
              <div className="relative">
                <SidebarItemWithTooltip title={item.title} showTooltip={!isOpen && !isMobile}>
                  <button
                    onClick={() => toggleExpand(item.title)}
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "p-2 rounded-lg transition-all flex justify-center",
                      (isActivePath(item.path) || isActiveSection(item))
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </button>
                </SidebarItemWithTooltip>
                
                {/* Conditionally render floating submenu on hover */}
                {hoveredItem === item.title && item.subItems && (
                  <div className="absolute left-full ml-2 top-0 z-50 bg-sidebar border border-sidebar-border rounded-md shadow-md py-1 min-w-40">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        onClick={handleCloseSidebar}
                        className={cn(
                          "flex items-center px-4 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          location.pathname === subItem.path
                            ? "bg-sidebar-accent/50 text-sidebar-primary"
                            : "text-sidebar-foreground"
                        )}
                      >
                        <subItem.icon className="mr-2 h-4 w-4" />
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <SidebarItemWithTooltip title={item.title} showTooltip={!isOpen && !isMobile}>
                <Link
                  to={item.path}
                  onClick={handleCloseSidebar}
                  className={cn(
                    "p-2 rounded-lg transition-all flex justify-center",
                    isActivePath(item.path)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </SidebarItemWithTooltip>
            )}
          </div>
        ))}
      </nav>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed z-50 transition-all duration-300 ease-in-out border-r border-sidebar-border",
          isMobile 
            ? isOpen ? "left-0 w-64" : "-left-full"
            : isOpen ? "left-0 w-64" : "left-0 w-[70px] transform"
        )}
      >
        <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
          <Link to={getDashboardPath()} className="flex items-center space-x-2" onClick={handleCloseSidebar}>
            <Camera className="h-6 w-6 text-red-500" />
            <span className={cn(
              "font-bold text-lg transition-opacity duration-300",
              (!isOpen && !isMobile) && "opacity-0"
            )}>FaceDetect</span>
          </Link>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hidden md:flex"
            >
              {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          )}
        </div>

        {/* User information */}
        {user && (
          <div className={cn(
            "border-b border-sidebar-border bg-sidebar-accent/20",
            isOpen ? "p-4" : "py-4 px-2"
          )}>
            {isOpen ? (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-sidebar-primary/80 flex items-center justify-center text-sidebar-primary-foreground font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar-background"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name || 'User'}</p>
                  <p className="text-xs text-sidebar-foreground/70 capitalize">{user.role} • Online</p>
                </div>
              </div>
            ) : (
              <SidebarItemWithTooltip title={user.name || 'User'} showTooltip={!isOpen && !isMobile}>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-sidebar-primary/80 flex items-center justify-center text-sidebar-primary-foreground font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar-background"></div>
                  </div>
                </div>
              </SidebarItemWithTooltip>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-2">
          {/* Render either collapsed or expanded sidebar items */}
          {(!isOpen && !isMobile) ? (
            renderCollapsedSidebarItems()
          ) : (
            <nav className="px-2 space-y-1">
              {filteredItems.map((item) => (
                <div key={item.path} className="space-y-1">
                  {item.subItems ? (
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-md transition-colors",
                        (isActivePath(item.path) || isActiveSection(item))
                          ? "bg-sidebar-primary/80 text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        expandedItems[item.title] && "border-l-2 border-red-500 dark:border-red-600"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-all",
                        !expandedItems[item.title] && "rotate-180"
                      )} />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={handleCloseSidebar}
                      className={cn(
                        "flex items-center px-4 py-2.5 text-sm rounded-md transition-colors",
                        isActivePath(item.path)
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  )}

                  {/* Render sub-items when expanded */}
                  {item.subItems && (
                    <div 
                      className={cn(
                        "pl-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out",
                        expandedItems[item.title] 
                          ? "max-h-96 opacity-100 mt-1" 
                          : "max-h-0 opacity-0"
                      )}
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          onClick={handleCloseSidebar}
                          className={cn(
                            "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
                            location.pathname === subItem.path
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                          )}
                        >
                          <subItem.icon className="mr-3 h-4 w-4" />
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>

        {/* Role-specific quick actions */}
        {getRoleSpecificActions()}

        {/* Logout button for both collapsed and expanded views */}
        <div className={cn(
          "border-t border-sidebar-border",
          isOpen ? "p-4" : "py-4"
        )}>
          {isOpen ? (
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={logout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </Button>
          ) : (
            <SidebarItemWithTooltip title="Logout" showTooltip={!isOpen && !isMobile}>
              <Button
                variant="ghost"
                className="w-full flex justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </SidebarItemWithTooltip>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

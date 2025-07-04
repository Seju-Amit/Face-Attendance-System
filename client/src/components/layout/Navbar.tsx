import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Bell, 
  Menu, 
  Search, 
  Moon, 
  Sun, 
  ChevronDown, 
  BarChart3, 
  Users, 
  Camera, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Star,
  Sparkles,
  LogIn,
  Home
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Logo from "./Logo";

interface NavbarProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setIsSidebarOpen }: NavbarProps) => {
  const { toggleTheme, theme } = useTheme();
  const { user, logout } = useAuth();
  const [notificationCount] = useState(3); // Mock notification count
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  // Check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

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

  // Navigate to user's dashboard
  const navigateToDashboard = () => {
    navigate(getDashboardPath());
  };

  return (
    <header 
      className={`fixed top-0 right-0 left-0 z-30 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md shadow-md" 
          : "bg-background/80 backdrop-blur-sm"
      } border-b border-border/50 h-16`}
    >
      <div className="flex items-center justify-between h-full px-0 md:px-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Sidebar toggle button - only shown when user is logged in */}
          {user && (
            <div className="h-16 px-3 flex items-center border-r border-border/30">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary/70 hover:text-primary transition-colors"
                onClick={() => setIsSidebarOpen(prev => !prev)}
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          )}
          
          <Logo className="animate-fade-in" />
          
          <div className="hidden md:flex relative ml-6">
            <div className="relative flex items-center group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-secondary/80 text-secondary-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-secondary w-72 transition-all group-hover:w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-1 mr-2">
          <nav className="hidden md:flex items-center">
            {user ? (
              <Button
                variant="ghost"
                className="px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                onClick={navigateToDashboard}
              >
                <Home className="h-4 w-4 mr-1.5" />
                Dashboard
              </Button>
            ) : (
              <Link 
                to="/" 
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
            )}
            
            <Link 
              to="/about" 
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Features <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 backdrop-blur-sm">
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/face-recognition" className="flex cursor-pointer gap-2">
                      <Camera className="h-4 w-4" />
                      <span>Face Recognition</span>
                      <Badge variant="outline" className="ml-auto text-xs py-0 h-5">New</Badge>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/attendance" className="flex cursor-pointer gap-2">
                      <Users className="h-4 w-4" />
                      <span>Attendance</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/reports" className="flex cursor-pointer gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Reports</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/analytics" className="flex cursor-pointer gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>Analytics</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Resources <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 backdrop-blur-sm">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="backdrop-blur-sm">
                      <DropdownMenuItem>Documentation</DropdownMenuItem>
                      <DropdownMenuItem>Tutorials</DropdownMenuItem>
                      <DropdownMenuItem>Contact Support</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>What's New</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Premium Features</span>
                  <Badge className="ml-auto text-xs py-0 h-5 bg-gradient-to-r from-red-600 to-red-800 border-none">Pro</Badge>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {!user && (
            <Button 
              variant="default" 
              size="sm" 
              className="rounded-md font-medium bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 border-none text-white flex items-center gap-1.5 mr-2"
              asChild
            >
              <Link to="/login">
                <LogIn className="h-4 w-4" />
                Login / SignUp
              </Link>
            </Button>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-secondary/80 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground animate-pulse"
                      variant="default"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{theme === "light" ? "Dark mode" : "Light mode"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="h-6 w-px bg-border/50 mx-1 hidden md:block"></div>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full hover:bg-secondary/80 transition-colors hover:scale-105"
                >
                  <Avatar className="h-8 w-8 border border-border ring-2 ring-background transition-transform">
                    <AvatarImage 
                      src={user?.avatar} 
                      alt={user?.name || "User"} 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 backdrop-blur-sm" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-0">
                  <div 
                    className="flex flex-col space-y-1 p-2 pb-1 cursor-pointer hover:bg-secondary/40 rounded-t-md transition-colors"
                    onClick={navigateToDashboard}
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarImage 
                          src={user?.avatar} 
                          alt={user?.name || "User"} 
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                          {user?.name ? getInitials(user.name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground mt-1">
                          {user?.email}
                        </p>
                        <p className="text-xs text-primary mt-1 flex items-center">
                          <Home className="h-3 w-3 mr-1" /> 
                          Go to Dashboard
                        </p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex cursor-pointer items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex cursor-pointer items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex cursor-pointer items-center gap-2 text-red-500 focus:text-red-500">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

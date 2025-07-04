import { useState, ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const { user } = useAuth();

  // Reset sidebar state when user logs in/out
  useEffect(() => {
    if (!user) {
      setIsSidebarOpen(false);
    } else if (!isMobile) {
      setIsSidebarOpen(true);
    }
  }, [user, isMobile]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Only show sidebar if user is logged in */}
      {user && (
        <Sidebar 
          isMobile={isMobile} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />
      )}

      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300",
        user && isSidebarOpen && !isMobile ? "md:ml-64" : user && !isSidebarOpen && !isMobile ? "md:ml-[70px]" : "ml-0"
      )}>
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 p-4 mt-16 md:p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

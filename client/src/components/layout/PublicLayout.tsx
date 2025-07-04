import { useState, ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Include sidebar if user is logged in */}
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
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout; 
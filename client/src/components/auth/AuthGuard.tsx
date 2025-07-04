
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Check if user is authenticated and authorized
  const checkAuth = () => {
    if (isLoading) {
      return false; // Still loading, don't redirect yet
    }

    if (!isAuthenticated) {
      return false; // Not authenticated
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      return false; // Not authorized for this role
    }

    return true; // Authenticated and authorized
  };

  if (isLoading) {
    // Show loading spinner while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!checkAuth()) {
    // Redirect to login page if not authenticated or authorized
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated and authorized, render children
  return <>{children}</>;
};

export default AuthGuard;

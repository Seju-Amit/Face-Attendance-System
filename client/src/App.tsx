import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthGuard from "./components/auth/AuthGuard";

// Pages
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import SubAdminDashboardPage from "./pages/SubAdminDashboardPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import FaceRecognitionPage from "./pages/FaceRecognitionPage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              
              {/* Protected routes with role-specific redirects */}
              <Route 
                path="/dashboard" 
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                } 
              />
              
              {/* Role-specific dashboard routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <AuthGuard allowedRoles={["admin"]}>
                    <AdminDashboardPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/subadmin/dashboard" 
                element={
                  <AuthGuard allowedRoles={["sub-admin"]}>
                    <SubAdminDashboardPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/student/dashboard" 
                element={
                  <AuthGuard allowedRoles={["student"]}>
                    <StudentDashboardPage />
                  </AuthGuard>
                } 
              />
              
              <Route 
                path="/face-recognition" 
                element={
                  <AuthGuard allowedRoles={["admin", "sub-admin"]}>
                    <FaceRecognitionPage />
                  </AuthGuard>
                } 
              />
              
              {/* Static pages */}
              <Route path="/features" element={<NotFound />} />
              <Route path="/pricing" element={<NotFound />} />
              <Route path="/contact" element={<NotFound />} />
              <Route path="/documentation" element={<NotFound />} />
              
              {/* Not found route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

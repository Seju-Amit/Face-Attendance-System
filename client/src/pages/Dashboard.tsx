import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard", { replace: true });
          break;
        case "sub-admin":
          navigate("/subadmin/dashboard", { replace: true });
          break;
        case "student":
          navigate("/student/dashboard", { replace: true });
          break;
        default:
          // Stay on generic dashboard if role is not recognized
          break;
      }
    }
  }, [user, navigate]);

  // Show a loading state or fallback content while redirecting
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-[calc(100vh-150px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Redirecting to your dashboard...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

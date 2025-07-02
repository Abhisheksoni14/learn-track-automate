import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { EmployeeDashboard } from '../components/dashboard/EmployeeDashboard';
import LDDashboard from '../components/dashboard/LDDashboard';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';

const Index = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get user role from the authenticated user
  const userRole = user?.role?.toLowerCase() || 'employee';

  // Redirect to login if no user (this should be handled by ProtectedRoute, but as a fallback)
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Redirect to /dashboard if on root path
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard', { replace: true });
    }
  }, [location.pathname, navigate]);

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentRole={userRole} />
      <div className="flex-1 flex flex-col">
        <Header 
          user={user}
          currentRole={userRole}
          onLogout={logout}
        />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Index;

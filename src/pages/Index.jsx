import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { EmployeeDashboard } from '../components/dashboard/EmployeeDashboard';
import LDDashboard from '../components/dashboard/LDDashboard';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';

const Index = () => {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const navigate = useNavigate();

  // Get user role from the authenticated user
  const userRole = user?.role?.toLowerCase() || 'employee';

  // Redirect to login if no user (this should be handled by ProtectedRoute, but as a fallback)
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const renderDashboard = () => {
    switch (userRole) {
      case 'employee':
        return <EmployeeDashboard currentView={currentView} setCurrentView={setCurrentView} />;
      case 'l&d':
      case 'ld':
        return <LDDashboard currentView={currentView} setCurrentView={setCurrentView} />;
      case 'admin':
        return <AdminDashboard currentView={currentView} setCurrentView={setCurrentView} />;
      default:
        return <EmployeeDashboard currentView={currentView} setCurrentView={setCurrentView} />;
    }
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentRole={userRole} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      <div className="flex-1 flex flex-col">
        <Header 
          user={user}
          currentRole={userRole}
          onLogout={logout}
        />
        <main className="flex-1 p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Index;

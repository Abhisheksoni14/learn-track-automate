
import { useState } from 'react';
import { ModernSidebar } from '../components/layout/ModernSidebar';
import { ModernHeader } from '../components/layout/ModernHeader';
import { EmployeeDashboard } from '../components/dashboard/EmployeeDashboard';
import { LDDashboard } from '../components/dashboard/LDDashboard';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';

const Index = () => {
  const [currentRole, setCurrentRole] = useState<'employee' | 'ld' | 'admin'>('employee');
  const [currentView, setCurrentView] = useState('dashboard');

  const renderDashboard = () => {
    switch (currentRole) {
      case 'employee':
        return <EmployeeDashboard currentView={currentView} setCurrentView={setCurrentView} />;
      case 'ld':
        return <LDDashboard currentView={currentView} setCurrentView={setCurrentView} />;
      case 'admin':
        return <AdminDashboard currentView={currentView} setCurrentView={setCurrentView} />;
      default:
        return <EmployeeDashboard currentView={currentView} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-900">
      <ModernSidebar 
        currentRole={currentRole} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      <div className="flex-1 flex flex-col ml-64">
        <ModernHeader 
          currentRole={currentRole} 
          setCurrentRole={setCurrentRole}
          setCurrentView={setCurrentView}
        />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {renderDashboard()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

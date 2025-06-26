
import { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
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
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentRole={currentRole} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      <div className="flex-1 flex flex-col">
        <Header 
          currentRole={currentRole} 
          setCurrentRole={setCurrentRole}
          setCurrentView={setCurrentView}
        />
        <main className="flex-1 p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Index;

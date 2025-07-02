import { useAuth } from '../../contexts/AuthContext';
import { EmployeeDashboard } from './EmployeeDashboard';
import LDDashboard from './LDDashboard';
import { AdminDashboard } from './AdminDashboard';
import React, { useState } from 'react';

const RoleDashboardRouter = () => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();
  const [currentView, setCurrentView] = useState('dashboard');

  if (role === 'ld' || role === 'l&d') {
    return <LDDashboard currentView={currentView} setCurrentView={setCurrentView} />;
  }
  if (role === 'admin') {
    return <AdminDashboard currentView={currentView} setCurrentView={setCurrentView} />;
  }
  // Default to employee
  return <EmployeeDashboard currentView={currentView} setCurrentView={setCurrentView} />;
};

export default RoleDashboardRouter; 
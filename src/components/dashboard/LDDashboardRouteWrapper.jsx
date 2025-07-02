import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LDDashboard from './LDDashboard';

const viewFromPath = (pathname) => {
  // Assumes /requests, /calendar, /dashboard, etc.
  const match = pathname.match(/\/(dashboard|requests|trainers|calendar|reports)$/);
  return match ? match[1] : 'dashboard';
};

const LDDashboardRouteWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentView = viewFromPath(location.pathname);

  const setCurrentView = (view) => {
    navigate('/' + view);
  };

  return <LDDashboard currentView={currentView} setCurrentView={setCurrentView} />;
};

export default LDDashboardRouteWrapper; 
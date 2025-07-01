import React, { useState, useEffect } from 'react';
import { StatsCard } from '../ui/StatsCard';
import { Users, FileText, Settings, Shield } from 'lucide-react';
import { UserManagement } from '../admin/UserManagement';
import { CourseManagement } from '../admin/CourseManagement';
import { SystemSettings } from '../admin/SystemSettings';
import api from '../../lib/axios';

export const AdminDashboard = ({ currentView, setCurrentView }) => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentView === 'dashboard') {
      setLoading(true);
      Promise.all([
        api.get('/api/admin/dashboard'),
        api.get('/api/admin/activities')
      ])
        .then(([statsRes, activitiesRes]) => {
          setStats(statsRes.data);
          setActivities(activitiesRes.data);
        })
        .catch(() => setError('Failed to load dashboard data.'))
        .finally(() => setLoading(false));
    }
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case 'users':
        return <UserManagement />;
      case 'courses':
        return <CourseManagement />;
      
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-3 p-6 text-gray-500">Loading...</div>
              ) : error ? (
                <div className="col-span-3 p-6 text-red-500">{error}</div>
              ) : stats ? (
                <>
                  <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    color="blue"
                  />
                  <StatsCard
                    title="Active Courses"
                    value={stats.activeCourses}
                    icon={FileText}
                    color="green"
                  />
                  <StatsCard
                    title="System Health"
                    value={stats.systemHealth}
                    icon={Shield}
                    color="purple"
                  />
                </>
              ) : null}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-900">Database Status</span>
                    <span className="text-green-600 font-medium">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-900">Email Service</span>
                    <span className="text-blue-600 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-900">SSO Integration</span>
                    <span className="text-purple-600 font-medium">Connected</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        {/* <button 
          onClick={() => setCurrentView('settings')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          System Settings
        </button> */}
      </div>

      {renderContent()}
    </div>
  );
};

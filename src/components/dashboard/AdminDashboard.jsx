import React from 'react';
import { StatsCard } from '../ui/StatsCard';
import { Users, FileText, Settings, Shield } from 'lucide-react';
import { UserManagement } from '../admin/UserManagement';
import { CourseManagement } from '../admin/CourseManagement';
import { SystemSettings } from '../admin/SystemSettings';

export const AdminDashboard = ({ currentView, setCurrentView }) => {
  const renderContent = () => {
    switch (currentView) {
      case 'users':
        return <UserManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Users"
                value="245"
                icon={Users}
                color="blue"
              />
              <StatsCard
                title="Active Courses"
                value="68"
                icon={FileText}
                color="green"
              />
              <StatsCard
                title="System Health"
                value="99.9%"
                icon={Shield}
                color="purple"
              />
              <StatsCard
                title="Configurations"
                value="12"
                icon={Settings}
                color="gray"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>New user registered: alice.johnson@company.com</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Course "Data Science 101" published</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>System backup completed successfully</span>
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
        <button 
          onClick={() => setCurrentView('settings')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          System Settings
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

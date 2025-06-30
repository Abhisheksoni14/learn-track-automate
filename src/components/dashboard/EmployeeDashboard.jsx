import React from 'react';
import { StatsCard } from '../ui/StatsCard';
import { FileText, Calendar, Clock, CheckCircle } from 'lucide-react';

export const EmployeeDashboard = ({ currentView, setCurrentView }) => {
  const renderContent = () => {
    switch (currentView) {
      case 'request':
        return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Training Request</h3>
          <p>Training request form would go here...</p>
        </div>;
      case 'mytrainings':
        return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Trainings</h3>
          <p>Training list would go here...</p>
        </div>;
      case 'notifications':
        return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <p>Notifications would go here...</p>
        </div>;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Active Requests"
                value="3"
                icon={FileText}
                color="blue"
              />
              <StatsCard
                title="Completed Trainings"
                value="12"
                icon={CheckCircle}
                color="green"
              />
              <StatsCard
                title="Upcoming Sessions"
                value="2"
                icon={Calendar}
                color="yellow"
              />
              <StatsCard
                title="Hours Logged"
                value="45"
                icon={Clock}
                color="purple"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Training Requests</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>React Advanced Concepts - Pending Approval</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Data Analysis with Python - Approved</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Machine Learning Basics</p>
                      <p className="text-gray-500">Tomorrow, 2:00 PM</p>
                    </div>
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
        <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
        <button 
          onClick={() => setCurrentView('request')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          New Request
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

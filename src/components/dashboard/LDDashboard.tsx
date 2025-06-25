
import { useState } from 'react';
import { StatsCard } from '../ui/StatsCard';
import { FileText, Users, Calendar, CheckCircle } from 'lucide-react';

interface LDDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const LDDashboard = ({ currentView, setCurrentView }: LDDashboardProps) => {
  if (currentView !== 'dashboard') {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl text-gray-600">L&D Feature - {currentView}</h2>
        <p className="text-gray-500 mt-2">This feature is under development</p>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">L&D Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pending Requests"
          value="12"
          icon={FileText}
          color="yellow"
        />
        <StatsCard
          title="Active Trainers"
          value="8"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Scheduled Trainings"
          value="15"
          icon={Calendar}
          color="green"
        />
        <StatsCard
          title="Completed This Month"
          value="24"
          icon={CheckCircle}
          color="purple"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentView('requests')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
          >
            <FileText className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium">Manage Requests</h4>
            <p className="text-sm text-gray-500">Review and approve training requests</p>
          </button>
          
          <button
            onClick={() => setCurrentView('trainers')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
          >
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium">Invite Trainers</h4>
            <p className="text-sm text-gray-500">Send invitations to external trainers</p>
          </button>
          
          <button
            onClick={() => setCurrentView('calendar')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
          >
            <Calendar className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="font-medium">Training Calendar</h4>
            <p className="text-sm text-gray-500">View and manage training schedule</p>
          </button>
          
          <button
            onClick={() => setCurrentView('reports')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
          >
            <CheckCircle className="w-6 h-6 text-red-600 mb-2" />
            <h4 className="font-medium">Reports</h4>
            <p className="text-sm text-gray-500">Generate training reports and analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

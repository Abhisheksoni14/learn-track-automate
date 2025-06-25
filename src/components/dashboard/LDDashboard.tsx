
import { StatsCard } from '../ui/StatsCard';
import { ManageRequests } from '../ld/ManageRequests';
import { InviteTrainers } from '../ld/InviteTrainers';
import { TrainingCalendar } from '../ld/TrainingCalendar';
import { Reports } from '../ld/Reports';
import { FileText, Users, Calendar, CheckCircle } from 'lucide-react';

interface LDDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const LDDashboard = ({ currentView, setCurrentView }: LDDashboardProps) => {
  if (currentView === 'requests') {
    return <ManageRequests onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'trainers') {
    return <InviteTrainers onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'calendar') {
    return <TrainingCalendar onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'reports') {
    return <Reports onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">L&D Dashboard</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentView('requests')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Manage Requests
          </button>
          <button
            onClick={() => setCurrentView('trainers')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Invite Trainers
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pending Requests"
          value="15"
          icon={FileText}
          color="yellow"
        />
        <StatsCard
          title="Active Trainers"
          value="28"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Scheduled Sessions"
          value="12"
          icon={Calendar}
          color="green"
        />
        <StatsCard
          title="Completed This Month"
          value="34"
          icon={CheckCircle}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Training Requests</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div>
                <h4 className="font-medium text-gray-900">Machine Learning Basics</h4>
                <p className="text-sm text-gray-500">Requested by John Doe - Engineering</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-yellow-600 bg-yellow-100">
                Pending Review
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div>
                <h4 className="font-medium text-gray-900">Leadership Workshop</h4>
                <p className="text-sm text-gray-500">Requested by Sarah Smith - Management</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
                Tech Approved
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setCurrentView('requests')}
              className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">Review Training Requests</span>
              <span className="text-sm text-blue-600">15 pending</span>
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">Schedule New Session</span>
              <Calendar className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={() => setCurrentView('reports')}
              className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">Generate Reports</span>
              <FileText className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

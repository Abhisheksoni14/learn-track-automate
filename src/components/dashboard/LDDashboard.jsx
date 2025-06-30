
import { StatsCard } from '../ui/StatsCard';
import { FileText, Users, Calendar, TrendingUp } from 'lucide-react';

export const LDDashboard = ({ currentView, setCurrentView }) => {
  const renderContent = () => {
    switch (currentView) {
      case 'requests':
        return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Requests</h3>
          <p>Request management interface would go here...</p>
        </div>;
      case 'trainers':
        return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite Trainers</h3>
          <p>Trainer invitation interface would go here...</p>
        </div>;
      case 'calendar':
        return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Calendar</h3>
          <p>Calendar view would go here...</p>
        </div>;
      case 'reports':
        return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports</h3>
          <p>Reports and analytics would go here...</p>
        </div>;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Pending Requests"
                value="15"
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
                title="This Month Sessions"
                value="24"
                icon={Calendar}
                color="green"
              />
              <StatsCard
                title="Completion Rate"
                value="87%"
                icon={TrendingUp}
                color="purple"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>AWS Cloud Architecture - John Doe</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>UI/UX Design Principles - Jane Smith</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Analytics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                    <span className="text-sm font-bold text-green-600">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Average Rating</span>
                    <span className="text-sm font-bold text-blue-600">4.8/5</span>
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
        <h1 className="text-3xl font-bold text-gray-900">L&D Dashboard</h1>
        <button 
          onClick={() => setCurrentView('requests')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Manage Requests
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

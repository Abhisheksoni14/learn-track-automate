import { useState } from 'react';
import { StatsCard } from '../ui/StatsCard';
import { TrainingRequestForm } from '../forms/TrainingRequestForm';
import { MyTrainings } from '../training/MyTrainings';
import { NotificationsList } from '../notifications/NotificationsList';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface EmployeeDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const EmployeeDashboard = ({ currentView, setCurrentView }: EmployeeDashboardProps) => {
  const [recentRequests] = useState([
    { id: 1, title: 'React Advanced Concepts', date: '2024-06-20', status: 'approved' },
    { id: 2, title: 'Cloud Computing Basics', date: '2024-06-18', status: 'pending' },
    { id: 3, title: 'Project Management', date: '2024-06-15', status: 'tech_approved' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      case 'tech_approved':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Fully Approved';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      case 'tech_approved':
        return 'Tech Approved';
      default:
        return status;
    }
  };

  if (currentView === 'request') {
    return <TrainingRequestForm onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'mytrainings') {
    return <MyTrainings onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'notifications') {
    return <NotificationsList onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <button
          onClick={() => setCurrentView('request')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Submit New Request
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Scheduled Trainings"
          value="3"
          icon={Calendar}
          color="blue"
        />
        <StatsCard
          title="Pending Requests"
          value="2"
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="Approved Requests"
          value="8"
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Completed Trainings"
          value="12"
          icon={CheckCircle}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h3>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{request.title}</h4>
                  <p className="text-sm text-gray-500">{request.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {getStatusText(request.status)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Trainings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Trainings (Next 30 Days)</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <div>
                <h4 className="font-medium text-gray-900">React Advanced Workshop</h4>
                <p className="text-sm text-gray-500">June 28, 2024 - 10:00 AM</p>
              </div>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
              <div>
                <h4 className="font-medium text-gray-900">DevOps Fundamentals</h4>
                <p className="text-sm text-gray-500">July 2, 2024 - 2:00 PM</p>
              </div>
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

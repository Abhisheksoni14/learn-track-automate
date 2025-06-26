
import { useState } from 'react';
import { StatsCard } from '../ui/StatsCard';
import { TrainingRequestForm } from '../forms/TrainingRequestForm';
import { MyTrainings } from '../training/MyTrainings';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EmployeeDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

interface UpcomingTraining {
  id: number;
  title: string;
  date: string;
  time: string;
  trainer: string;
  availableSpots: number;
  totalSpots: number;
  isEnrolled: boolean;
}

export const EmployeeDashboard = ({ currentView, setCurrentView }: EmployeeDashboardProps) => {
  const [recentRequests] = useState([
    { id: 1, title: 'React Advanced Concepts', date: '2024-06-20', status: 'approved' },
    { id: 2, title: 'Cloud Computing Basics', date: '2024-06-18', status: 'pending' },
    { id: 3, title: 'Project Management', date: '2024-06-15', status: 'tech_approved' },
  ]);

  const [upcomingTrainings, setUpcomingTrainings] = useState<UpcomingTraining[]>([
    {
      id: 1,
      title: 'React Advanced Workshop',
      date: '2024-06-28',
      time: '10:00 AM - 2:00 PM',
      trainer: 'John Smith',
      availableSpots: 8,
      totalSpots: 12,
      isEnrolled: false
    },
    {
      id: 2,
      title: 'DevOps Fundamentals',
      date: '2024-07-02',
      time: '2:00 PM - 5:00 PM',
      trainer: 'Sarah Wilson',
      availableSpots: 5,
      totalSpots: 10,
      isEnrolled: false
    }
  ]);

  const handleEnrollment = (trainingId: number, isEnrolling: boolean) => {
    setUpcomingTrainings(prevTrainings =>
      prevTrainings.map(training => {
        if (training.id === trainingId) {
          const updatedTraining = {
            ...training,
            isEnrolled: isEnrolling,
            availableSpots: isEnrolling 
              ? training.availableSpots - 1 
              : training.availableSpots + 1
          };
          
          if (isEnrolling) {
            toast({
              title: "Enrollment Successful",
              description: `You have successfully enrolled in ${training.title}`,
            });
          } else {
            toast({
              title: "Unenrolled Successfully",
              description: `You have been unenrolled from ${training.title}`,
            });
          }
          
          return updatedTraining;
        }
        return training;
      })
    );
  };

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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Trainings</h3>
          <div className="space-y-4">
            {upcomingTrainings.map((training) => (
              <div key={training.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{training.title}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {training.date} • {training.time}
                      </div>
                      <p>Trainer: {training.trainer}</p>
                      <p className="text-xs">
                        {training.availableSpots} of {training.totalSpots} spots available
                      </p>
                    </div>
                  </div>
                  <div className="ml-4">
                    {training.isEnrolled ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Enrolled
                      </span>
                    ) : (
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        training.availableSpots > 0 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {training.availableSpots > 0 ? 'Available' : 'Full'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {training.isEnrolled ? (
                    <button
                      onClick={() => handleEnrollment(training.id, false)}
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Unenroll
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnrollment(training.id, true)}
                      disabled={training.availableSpots === 0}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                        training.availableSpots > 0
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {training.availableSpots > 0 ? 'Enroll Now' : 'Full'}
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

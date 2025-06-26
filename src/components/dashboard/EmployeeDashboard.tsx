import { useState } from 'react';
import { MetricWidget } from '../ui/MetricWidget';
import { TrainingRequestForm } from '../forms/TrainingRequestForm';
import { MyTrainings } from '../training/MyTrainings';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, Users, BookOpen } from 'lucide-react';
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
        return 'text-green-400 bg-green-500/20 border border-green-500/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20 border border-yellow-500/30';
      case 'rejected':
        return 'text-red-400 bg-red-500/20 border border-red-500/30';
      case 'tech_approved':
        return 'text-blue-400 bg-blue-500/20 border border-blue-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border border-slate-500/30';
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to your Neural Hub
          </h1>
          <p className="text-slate-400 text-lg">Track your learning journey and unlock new skills</p>
        </div>
        <button
          onClick={() => setCurrentView('request')}
          className="neon-button"
        >
          Launch New Request
        </button>
      </div>

      {/* Metric Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricWidget
          title="Active Sessions"
          value="3"
          icon={Calendar}
          trend="+2"
          trendDirection="up"
          color="blue"
        />
        <MetricWidget
          title="Pending Queue"
          value="2"
          icon={Clock}
          trend="1"
          trendDirection="down"
          color="yellow"
        />
        <MetricWidget
          title="Completed Paths"
          value="12"
          icon={CheckCircle}
          trend="+4"
          trendDirection="up"
          color="green"
        />
        <MetricWidget
          title="Neural Score"
          value="856"
          icon={TrendingUp}
          trend="+23"
          trendDirection="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Panel */}
        <div className="neon-card p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Recent Learning Activity</h3>
          </div>
          
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="glass-panel p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg mb-2">{request.title}</h4>
                    <p className="text-slate-400">{request.date}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-xl text-sm font-bold ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Training Modules */}
        <div className="neon-card p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Neural Training Modules</h3>
          </div>
          
          <div className="space-y-6">
            {upcomingTrainings.map((training) => (
              <div key={training.id} className="glass-panel p-6 hover:scale-105 transition-all duration-300">
                <div className="mb-4">
                  <h4 className="font-bold text-white text-lg mb-2">{training.title}</h4>
                  <div className="space-y-2 text-slate-400 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{training.date} • {training.time}</span>
                    </div>
                    <p>Neural Guide: {training.trainer}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-slate-700/50 px-3 py-1 rounded-full">
                        {training.availableSpots} of {training.totalSpots} slots available
                      </span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        training.isEnrolled 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : training.availableSpots > 0 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {training.isEnrolled ? 'Enrolled' : training.availableSpots > 0 ? 'Available' : 'Full'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {training.isEnrolled ? (
                    <button
                      onClick={() => handleEnrollment(training.id, false)}
                      className="px-6 py-3 bg-red-600/80 text-white font-bold rounded-xl hover:bg-red-500 transition-all duration-300 backdrop-blur-xl"
                    >
                      Exit Module
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnrollment(training.id, true)}
                      disabled={training.availableSpots === 0}
                      className={`px-6 py-3 font-bold rounded-xl transition-all duration-300 backdrop-blur-xl ${
                        training.availableSpots > 0
                          ? 'bg-green-600/80 text-white hover:bg-green-500'
                          : 'bg-slate-600/50 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {training.availableSpots > 0 ? 'Join Neural Network' : 'Module Full'}
                    </button>
                  )}
                  <button className="px-6 py-3 bg-slate-700/50 text-slate-300 font-bold rounded-xl hover:bg-slate-600/50 transition-all duration-300">
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

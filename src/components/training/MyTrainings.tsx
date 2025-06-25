
import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';

interface MyTrainingsProps {
  onBack: () => void;
}

export const MyTrainings = ({ onBack }: MyTrainingsProps) => {
  const [trainings] = useState([
    {
      id: 1,
      title: 'React Advanced Workshop',
      date: '2024-06-28',
      time: '10:00 AM',
      location: 'Conference Room A',
      status: 'upcoming',
      trainer: 'John Smith'
    },
    {
      id: 2,
      title: 'DevOps Fundamentals',
      date: '2024-07-02',
      time: '2:00 PM',
      location: 'Virtual',
      status: 'upcoming',
      trainer: 'Sarah Johnson'
    },
    {
      id: 3,
      title: 'Project Management Basics',
      date: '2024-05-15',
      time: '9:00 AM',
      location: 'Training Room B',
      status: 'completed',
      trainer: 'Mike Davis'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Trainings</h2>
        
        <div className="space-y-4">
          {trainings.map((training) => (
            <div key={training.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{training.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Trainer: {training.trainer}</p>
                  
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{training.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{training.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{training.location}</span>
                    </div>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(training.status)}`}>
                  {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

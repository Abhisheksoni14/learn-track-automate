
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

interface MyTrainingsProps {
  onBack: () => void;
}

export const MyTrainings = ({ onBack }: MyTrainingsProps) => {
  const attendingTrainings = [
    {
      id: 1,
      title: 'React Advanced Workshop',
      date: '2024-06-28',
      time: '10:00 AM - 2:00 PM',
      trainer: 'John Smith',
      status: 'upcoming',
      type: 'attending'
    },
    {
      id: 2,
      title: 'DevOps Fundamentals',
      date: '2024-07-02',
      time: '2:00 PM - 5:00 PM',
      trainer: 'Sarah Wilson',
      status: 'upcoming',
      type: 'attending'
    }
  ];

  const trainerAssignments = [
    {
      id: 3,
      title: 'JavaScript Basics for Beginners',
      date: '2024-07-05',
      time: '9:00 AM - 12:00 PM',
      participants: 12,
      status: 'assigned',
      type: 'training'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Trainings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trainings I'm Attending */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Trainings I'm Attending
          </h3>
          <div className="space-y-4">
            {attendingTrainings.map((training) => (
              <div key={training.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">{training.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {training.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {training.time}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Trainer: {training.trainer}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Upcoming
                  </span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Add to Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trainings I'm Conducting */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-green-600" />
            Trainings I'm Conducting
          </h3>
          <div className="space-y-4">
            {trainerAssignments.map((training) => (
              <div key={training.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">{training.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {training.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {training.time}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {training.participants} participants
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Assigned
                  </span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Prepare Content
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Participants
                  </button>
                </div>
              </div>
            ))}
            
            {trainerAssignments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No training assignments yet</p>
                <p className="text-sm">You'll see trainings here when L&D assigns you as a trainer</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

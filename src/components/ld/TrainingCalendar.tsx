
import { ArrowLeft, Calendar, Plus, Edit, Trash2 } from 'lucide-react';

interface TrainingCalendarProps {
  onBack: () => void;
}

export const TrainingCalendar = ({ onBack }: TrainingCalendarProps) => {
  const upcomingSessions = [
    {
      id: 1,
      title: 'React Advanced Workshop',
      date: '2024-06-28',
      time: '10:00 AM - 2:00 PM',
      trainer: 'Sarah Wilson',
      participants: 15,
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'DevOps Fundamentals',
      date: '2024-07-02',
      time: '2:00 PM - 5:00 PM',
      trainer: 'John Smith',
      participants: 12,
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Leadership Skills Development',
      date: '2024-07-05',
      time: '9:00 AM - 1:00 PM',
      trainer: 'Mike Johnson',
      participants: 8,
      status: 'draft'
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

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Training Calendar</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Schedule New Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">June 2024</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
          
          {/* Simple Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const date = i - 5; // Start from -5 to show previous month dates
              const isCurrentMonth = date > 0 && date <= 30;
              const hasTraining = [28].includes(date); // June 28 has training
              
              return (
                <div
                  key={i}
                  className={`p-2 text-center text-sm h-10 flex items-center justify-center relative ${
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-300'
                  } ${hasTraining ? 'bg-blue-100 text-blue-900 font-semibold' : ''}`}
                >
                  {date > 0 ? date : ''}
                  {hasTraining && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Upcoming Sessions
          </h3>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">{session.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    session.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {session.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>{session.date}</p>
                  <p>{session.time}</p>
                  <p>Trainer: {session.trainer}</p>
                  <p>{session.participants} participants</p>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-xs flex items-center">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Calendar className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Schedule Training</h4>
            <p className="text-sm text-gray-600">Create a new training session</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Edit className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Modify Sessions</h4>
            <p className="text-sm text-gray-600">Edit existing training sessions</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Trash2 className="w-6 h-6 text-red-600 mb-2" />
            <h4 className="font-medium text-gray-900">Cancel Sessions</h4>
            <p className="text-sm text-gray-600">Cancel upcoming sessions</p>
          </button>
        </div>
      </div>
    </div>
  );
};

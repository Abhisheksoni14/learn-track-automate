import React from 'react';
import { StatsCard } from '../ui/StatsCard';
import { FileText, Calendar, CheckCircle } from 'lucide-react';

const EmployeeDashboardHome = ({ stats, recentRequests, upcomingSessions, loading, error, onRegister }) => {
  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <StatsCard
          title="Active Requests"
          value={stats?.myTrainingRequests ?? 0}
          icon={FileText}
          color="blue"
        />
        <StatsCard
          title="Completed Trainings"
          value={stats?.mySessionsAttended ?? 0}
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Registered Sessions"
          value={stats?.mySessionsRegistered ?? 0}
          icon={Calendar}
          color="yellow"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Training Requests</h3>
          <div className="space-y-3 text-sm">
            {recentRequests.length === 0 ? (
              <div className="text-gray-500">No recent requests.</div>
            ) : (
              recentRequests.map((req) => (
                <div key={req.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${req.status === 'approved' ? 'bg-green-500' : req.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                  <span>{req.title} - {req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
          <div className="space-y-3 text-sm">
            {upcomingSessions.length === 0 ? (
              <div className="text-gray-500">No upcoming sessions.</div>
            ) : (
              upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-medium">{session.title}</p>
                    <p className="text-gray-500">{session.startDate ? new Date(session.startDate).toLocaleString() : ''}</p>
                  </div>
                  <button
                    className={`ml-auto px-3 py-1 rounded text-white text-xs font-medium transition-colors ${session.registered ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={session.registered}
                    onClick={() => onRegister && onRegister(session.id)}
                  >
                    {session.registered ? 'Registered' : 'Register'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboardHome; 
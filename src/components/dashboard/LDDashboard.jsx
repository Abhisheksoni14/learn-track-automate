import React, { useState, useEffect } from 'react';
import ManageRequests from '../ld/ManageRequests';
import InviteTrainers from '../ld/InviteTrainers';
import TrainingCalendar from '../ld/TrainingCalendar';
import Reports from '../ld/Reports';
import RecentTrainingRequests from './RecentTrainingRequests';
import { FileText, Users, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';
import api from '../../lib/axios';

const LDDashboard = ({ currentView, setCurrentView }) => {
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentView === 'dashboard') {
      setLoading(true);
      Promise.all([
        api.get('/api/training/dashboard/ld'),
        api.get('/api/training/requests')
      ])
        .then(([statsRes, requestsRes]) => {
          setStats(statsRes.data);
          setRecentRequests(requestsRes.data.slice(0, 5));
        })
        .catch(() => setError('Failed to load dashboard data.'))
        .finally(() => setLoading(false));
    }
  }, [currentView]);

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
        {loading ? (
          <div className="col-span-4 p-6 text-gray-500">Loading...</div>
        ) : error ? (
          <div className="col-span-4 p-6 text-red-500">{error}</div>
        ) : stats ? (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center space-x-4">
              <FileText className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">Pending Requests</div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center space-x-4">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">Active Participants</div>
                <div className="text-2xl font-bold text-blue-600">{stats.activeParticipants}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center space-x-4">
              <CalendarIcon className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">Scheduled Sessions</div>
                <div className="text-2xl font-bold text-green-600">{stats.upcomingSessions}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center space-x-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">Total Sessions</div>
                <div className="text-2xl font-bold text-purple-600">{stats.totalTrainingSessions}</div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <RecentTrainingRequests requests={recentRequests} loading={loading} error={error} />
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setCurrentView('requests')}
              className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">Review Training Requests</span>
              <span className="text-sm text-blue-600">{stats ? stats.PendingRequests : ''} pending</span>
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">Schedule New Session</span>
              <CalendarIcon className="w-5 h-5 text-gray-400" />
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

export default LDDashboard;

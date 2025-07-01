import React, { useState, useEffect } from 'react';
import api from '../../lib/axios';
import { ArrowLeft, Calendar, Plus, Edit, Trash2 } from 'lucide-react';

const TrainingCalendar = ({ onBack }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/api/training/sessions')
      .then(res => setSessions(res.data))
      .catch(() => setError('Failed to load training sessions.'))
      .finally(() => setLoading(false));
  }, []);

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
        {/* Calendar View Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
          {loading ? (
            <div className="p-6 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-6 text-red-500">{error}</div>
          ) : (
            <ul className="space-y-4">
              {sessions.map(session => (
                <li key={session.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{session.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      session.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>{session.startDate ? new Date(session.startDate).toLocaleString() : ''}</p>
                    <p>Trainer: {session.trainer}</p>
                    <p>{session.currentParticipants} participants</p>
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingCalendar; 
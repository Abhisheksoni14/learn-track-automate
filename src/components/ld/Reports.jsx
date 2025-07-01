import React, { useState, useEffect } from 'react';
import api from '../../lib/axios';
import { ArrowLeft, BarChart3, Download, Filter } from 'lucide-react';

const Reports = ({ onBack }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/api/training/dashboard/ld')
      .then(res => setStats(res.data))
      .catch(() => setError('Failed to load report stats.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
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
        <h2 className="text-2xl font-bold text-gray-900">Training Reports</h2>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-6 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="p-6 text-red-500">{error}</div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                <p className="text-sm text-gray-600 mt-1">Active users in the system</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mt-4">{stats.totalUsers}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Training Requests</h3>
                <p className="text-sm text-gray-600 mt-1">Total requests</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mt-4">{stats.totalTrainingRequests}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sessions</h3>
                <p className="text-sm text-gray-600 mt-1">Total sessions</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mt-4">{stats.totalTrainingSessions}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pending Requests</h3>
                <p className="text-sm text-gray-600 mt-1">Requests awaiting review</p>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-yellow-600 mt-4">{stats.pendingRequests}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Reports; 
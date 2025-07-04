import React, { useState, useEffect } from 'react';
import api from '../../lib/axios';
import { ArrowLeft, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Status order for sorting
const STATUS_ORDER = { pending: 0, approved: 1, completed: 2, rejected: 3 };

// Status color badge helper
const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ManageRequests = ({ onBack }) => {
  const [requests, setRequests] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState({});
  const navigate = useNavigate();

  // Helper to normalize request ID
  const getRequestId = req => String(req.id ?? req.Id);
  // Helper to remove duplicates by ID
  const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter(req => {
      const reqId = getRequestId(req);
      if (seen.has(reqId)) return false;
      seen.add(reqId);
      return true;
    });
  };

  // Fetch requests on mount
  useEffect(() => {
    setLoading(true);
    api.get('/api/training/requests')
      .then(res => setRequests(removeDuplicates(res.data)))
      .catch(() => setError('Failed to load training requests.'))
      .finally(() => setLoading(false));
    // Fetch all sessions for session details
    api.get('/api/training/sessions')
      .then(res => setSessions(res.data))
      .catch(() => {});
  }, []);

  // Handle approve/reject
  const handleStatusChange = async (id, status) => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await api.put(`/api/training/requests/${id}/status`, JSON.stringify(status), {
        headers: { 'Content-Type': 'application/json' },
      });
      const updatedRequest = {
        ...res.data,
        id: res.data.id || res.data.Id, // Always use 'id'
      };
      setRequests((prev) => {
        const updatedId = getRequestId(updatedRequest);
        const filtered = prev.filter(req => getRequestId(req) !== updatedId);
        console.log('Updated request:', updatedRequest);
        console.log('Prev IDs:', prev.map(getRequestId));
        console.log('Filtered IDs:', filtered.map(getRequestId));
        return [...filtered, updatedRequest];
      });
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Render
  return (
    <div className="max-w-7xl mx-auto">
      {/* Back button */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Training Requests</h2>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-6 text-red-500">{error}</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Training Request
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests
                  .slice()
                  .sort((a, b) => {
                    return (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99);
                  })
                  .map(({
                    id,
                    title,
                    department,
                    trainingType,
                    status,
                    trainerStatus,
                    TrainingSessionId,
                    CreatedAt
                  }) => {
                    const safeTrainerStatus = trainerStatus ?? 'none';
                    return (
                      <tr key={id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{trainingType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                          {safeTrainerStatus === 'accepted' && (
                            <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Trainer Accepted</span>
                          )}
                          {safeTrainerStatus === 'invited' && (
                            <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">Invited</span>
                          )}
                          {status === 'approved' && TrainingSessionId && (() => {
                            const session = sessions.find(s => (s.id || s.Id) === TrainingSessionId);
                            return session ? (
                              <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                Scheduled Session: {session.title || session.Title} ({session.startDate ? new Date(session.startDate).toLocaleDateString() : (session.StartDate ? new Date(session.StartDate).toLocaleDateString() : '')}) by {session.trainer || session.Trainer}
                              </span>
                            ) : (
                              <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Scheduled Session</span>
                            );
                          })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {CreatedAt ? new Date(CreatedAt).toLocaleDateString() : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {safeTrainerStatus === 'none' && status === 'pending' && (
                            <button
                              className="text-indigo-600 hover:text-indigo-900 inline-flex items-center border border-indigo-200 rounded px-2 py-1 text-xs font-semibold"
                              onClick={() => {
                                navigate(`/trainers?requestId=${id}`);
                              }}
                            >
                              Invite Trainer
                            </button>
                          )}
                          {status === 'approved' && !TrainingSessionId && (
                            <button
                              className="text-blue-600 hover:text-blue-900 inline-flex items-center border border-blue-200 rounded px-2 py-1 text-xs font-semibold"
                              onClick={() => navigate(`/calendar?requestId=${id}`)}
                            >
                              Schedule Session
                            </button>
                          )}
                          {status === 'pending' && (
                            <>
                              <button
                                className="text-green-600 hover:text-green-900 inline-flex items-center"
                                disabled={actionLoading[id]}
                                onClick={() => handleStatusChange(id, 'approved')}
                                title="Approve"
                              >
                                {actionLoading[id] ? (
                                  <span className="mr-1 animate-spin">⏳</span>
                                ) : (
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                )}
                                Approve
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900 inline-flex items-center"
                                disabled={actionLoading[id]}
                                onClick={() => handleStatusChange(id, 'rejected')}
                                title="Reject"
                              >
                                {actionLoading[id] ? (
                                  <span className="mr-1 animate-spin">⏳</span>
                                ) : (
                                  <XCircle className="w-4 h-4 mr-1" />
                                )}
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRequests; 
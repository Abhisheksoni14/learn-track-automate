import React, { useState, useEffect } from 'react';
import api from '../../lib/axios';
import { ArrowLeft, CheckCircle, XCircle, Eye } from 'lucide-react';

const ManageRequests = ({ onBack }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    setLoading(true);
    api.get('/api/training/requests')
      .then(res => setRequests(res.data))
      .catch(() => setError('Failed to load training requests.'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await api.put(`/api/training/requests/${id}/status`, JSON.stringify(status), {
        headers: { 'Content-Type': 'application/json' },
      });
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status } : req
        )
      );
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleView = (req) => {
    alert(
      `Title: ${req.title}\nDepartment: ${req.department}\nType: ${req.trainingType}\nStatus: ${req.status}`
    );
  };

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
        <h2 className="text-2xl font-bold text-gray-900">Manage Training Requests</h2>
      </div>

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
                {requests.map((request) => (
                  <tr key={request.Id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.trainingType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.CreatedAt ? new Date(request.CreatedAt).toLocaleDateString() : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                        onClick={() => handleView(request)}
                        title="View"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 inline-flex items-center"
                        disabled={actionLoading[request.Id] || request.status === 'approved'}
                        onClick={() => handleStatusChange(request.id, 'approved')}
                        title="Approve"
                      >
                        {actionLoading[request.Id] && request.status !== 'approved' ? (
                          <span className="mr-1 animate-spin">⏳</span>
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        )}
                        Approve
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 inline-flex items-center"
                        disabled={actionLoading[request.Id] || request.status === 'rejected'}
                        onClick={() => handleStatusChange(request.id, 'rejected')}
                        title="Reject"
                      >
                        {actionLoading[request.Id] && request.status !== 'rejected' ? (
                          <span className="mr-1 animate-spin">⏳</span>
                        ) : (
                          <XCircle className="w-4 h-4 mr-1" />
                        )}
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRequests; 
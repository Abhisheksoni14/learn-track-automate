import React from 'react';

const EmployeeMyTrainings = ({ myRequests, registeredSessions, loading, error }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">My Training Requests</h3>
    {loading ? (
      <div className="text-gray-500">Loading...</div>
    ) : error ? (
      <div className="text-red-500">{error}</div>
    ) : myRequests.length === 0 ? (
      <div className="text-gray-500">No training requests found.</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map(req => (
              <tr key={req.id} className="border-b">
                <td className="px-4 py-2">{req.title}</td>
                <td className="px-4 py-2">{req.department}</td>
                <td className="px-4 py-2">{req.trainingType}</td>
                <td className="px-4 py-2 capitalize">{req.status}</td>
                <td className="px-4 py-2">{req.createdAt ? new Date(req.createdAt).toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">My Registered Sessions</h3>
    {loading ? (
      <div className="text-gray-500">Loading...</div>
    ) : error ? (
      <div className="text-red-500">{error}</div>
    ) : !registeredSessions || registeredSessions.length === 0 ? (
      <div className="text-gray-500">No registered sessions found.</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Start Date</th>
              <th className="px-4 py-2 text-left">Trainer</th>
            </tr>
          </thead>
          <tbody>
            {registeredSessions.map(session => (
              <tr key={session.id || session.sessionId} className="border-b">
                <td className="px-4 py-2">{session.title}</td>
                <td className="px-4 py-2">{session.startDate ? new Date(session.startDate).toLocaleString() : ''}</td>
                <td className="px-4 py-2">{session.trainerName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default EmployeeMyTrainings; 
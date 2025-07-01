import React from 'react';

const RecentTrainingRequests = ({ requests, loading, error }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Training Requests</h3>
      {loading ? (
        <div className="p-6 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="p-6 text-red-500">{error}</div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.Id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div>
                <h4 className="font-medium text-gray-900">{req.title}</h4>
                <p className="text-sm text-gray-500">Department: {req.department}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-yellow-600 bg-yellow-100">
                {req.Status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTrainingRequests; 
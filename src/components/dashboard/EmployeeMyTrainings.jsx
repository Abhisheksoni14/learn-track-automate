import React, { useState } from 'react';
import api from '../../lib/axios';

const EmployeeMyTrainings = ({ myRequests, registeredSessions, trainerSessions = [], loading, error, reloadTrainerSessions }) => {
  const [activeTab, setActiveTab] = useState('requests');

  const handleTrainerRequestAction = async (sessionId, status) => {
    await api.put(`/api/training/sessions/${sessionId}/trainer-request-status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' }
    });
    if (reloadTrainerSessions) reloadTrainerSessions();
  };

  const tabs = [
    { id: 'requests', label: 'Training Requests', count: myRequests.length },
    { id: 'registered', label: 'Registered Sessions', count: registeredSessions.length },
    { id: 'trainer', label: 'Sessions as Trainer', count: trainerSessions.length }
  ];

  const renderRequestsTable = () => (
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
  );

  const renderRegisteredSessionsTable = () => (
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
              <td className="px-4 py-2">{session.trainerName || session.trainer || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTrainerSessionsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Start Date</th>
            <th className="px-4 py-2 text-left">End Date</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Trainer Request</th>
          </tr>
        </thead>
        <tbody>
          {trainerSessions.map(session => (
            <tr key={session.id || session.Id} className="border-b">
              <td className="px-4 py-2">{session.title || session.Title}</td>
              <td className="px-4 py-2">{session.startDate ? new Date(session.startDate).toLocaleString() : (session.StartDate ? new Date(session.StartDate).toLocaleString() : '')}</td>
              <td className="px-4 py-2">{session.endDate ? new Date(session.endDate).toLocaleString() : (session.EndDate ? new Date(session.EndDate).toLocaleString() : '')}</td>
              <td className="px-4 py-2">{session.location || session.Location || '-'}</td>
              <td className="px-4 py-2 capitalize">{session.status || session.Status}</td>
              <td className="px-4 py-2">
                {session.trainerRequestStatus === 'pending' || session.TrainerRequestStatus === 'pending' ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleTrainerRequestAction(session.id || session.Id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleTrainerRequestAction(session.id || session.Id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span>{session.trainerRequestStatus || session.TrainerRequestStatus}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTabContent = () => {
    if (loading) return <div className="text-gray-500">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    switch (activeTab) {
      case 'requests':
        return myRequests.length === 0 ? (
          <div className="text-gray-500">No training requests found.</div>
        ) : renderRequestsTable();
      case 'registered':
        return !registeredSessions || registeredSessions.length === 0 ? (
          <div className="text-gray-500">No registered sessions found.</div>
        ) : renderRegisteredSessionsTable();
      case 'trainer':
        return !trainerSessions || trainerSessions.length === 0 ? (
          <div className="text-gray-500">You have not delivered any trainings as a trainer.</div>
        ) : renderTrainerSessionsTable();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">My Trainings</h3>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EmployeeMyTrainings; 
import React, { useState, useEffect } from 'react';
import api from '../../lib/axios';
import { ArrowLeft, Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const DEPARTMENTS = [
  'All Departments',
  'IT',
  'HR',
  'Finance',
  'L&D',
  'Sales',
  'Marketing',
  'Operations',
  'Admin'
];

const TrainingCalendar = ({ onBack }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    startDate: '',
    endDate: '',
    trainer: '',
    location: '',
    department: 'All Departments',
    trainerAccepted: false,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const requestId = params.get('requestId');
  const [requestTitle, setRequestTitle] = useState('');

  const fetchSessions = () => {
    setLoading(true);
    api.get('/api/training/sessions')
      .then(res => setSessions(res.data))
      .catch(() => setError('Failed to load training sessions.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSessions();
    if (requestId) {
      setShowModal(true);
      api.get(`/api/training/requests/${requestId}`)
        .then(res => {
          setRequestTitle(res.data.title || res.data.Title || '');
          setForm(f => ({ ...f, title: res.data.title || res.data.Title || '' }));
        })
        .catch(() => {});
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    try {
      const sessionPayload = { ...form };
      if (requestId) {
        sessionPayload.TrainerRequestStatus = 'confirmed';
        sessionPayload.TrainingRequestId = Number(requestId);
        sessionPayload.TrainingRequestName = requestTitle;
      }
      const sessionRes = await api.post('/api/training/sessions', sessionPayload);
      const sessionId = sessionRes.data.id || sessionRes.data.Id;
      if (requestId && sessionId) {
        await api.put(`/api/training/requests/${requestId}/session`, sessionId, {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      setShowModal(false);
      setForm({ title: '', startDate: '', endDate: '', trainer: '', location: '', department: 'All Departments', trainerAccepted: false });
      fetchSessions();
    } catch {
      setFormError('Failed to schedule session.');
    } finally {
      setFormLoading(false);
    }
  };

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
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule New Session
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg space-y-4 w-full max-w-md">
            <h3 className="text-lg font-bold mb-2">Schedule New Session</h3>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="border p-2 w-full rounded" />
            <input name="startDate" type="datetime-local" value={form.startDate} onChange={handleChange} required className="border p-2 w-full rounded" />
            <input name="endDate" type="datetime-local" value={form.endDate} onChange={handleChange} required className="border p-2 w-full rounded" />
            <input name="trainer" value={form.trainer} onChange={handleChange} placeholder="Trainer" required className="border p-2 w-full rounded" />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 w-full rounded" />
            <label className="block text-sm font-medium">Invite Department</label>
            <select name="department" value={form.department} onChange={handleChange} className="border p-2 w-full rounded">
              {DEPARTMENTS.map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="trainerAccepted"
                checked={form.trainerAccepted}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span className="text-sm">Trainer has accepted the invite</span>
            </label>
            {!form.trainerAccepted && (
              <div className="text-yellow-600 text-xs">Please confirm the trainer has accepted the invite before scheduling.</div>
            )}
            {formError && <div className="text-red-500 text-sm">{formError}</div>}
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2">Cancel</button>
              <button type="submit" disabled={formLoading || !form.trainerAccepted} className="bg-blue-600 text-white px-4 py-2 rounded">
                {formLoading ? 'Scheduling...' : 'Schedule'}
              </button>
            </div>
          </form>
        </div>
      )}

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
                <li key={session.id || session.Id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{session.title || session.Title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      (session.status || session.Status) === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {session.status || session.Status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>{session.startDate ? new Date(session.startDate).toLocaleString() : (session.StartDate ? new Date(session.StartDate).toLocaleString() : '')}</p>
                    <p>Trainer: {session.trainer || session.Trainer}</p>
                    <p>{session.currentParticipants || session.CurrentParticipants} participants</p>
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
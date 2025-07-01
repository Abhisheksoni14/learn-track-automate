import React, { useEffect, useState } from 'react';
import api from '../../lib/axios';
import EmployeeDashboardHome from './EmployeeDashboardHome';
import EmployeeNewRequest from './EmployeeNewRequest';
import EmployeeMyTrainings from './EmployeeMyTrainings';
import EmployeeNotifications from './EmployeeNotifications';

export const EmployeeDashboard = ({ currentView, setCurrentView }) => {
  const [stats, setStats] = useState({});
  const [recentRequests, setRecentRequests] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', department: '', trainingType: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [registeredSessions, setRegisteredSessions] = useState([]);
  const [trainerSessions, setTrainerSessions] = useState([]);

  // Get userId from localStorage or AuthContext
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setError('User not found.');
      setLoading(false);
      return;
    }
    let isMounted = true;
    setLoading(true);
    setError('');

    if (currentView === 'dashboard') {
      Promise.all([
        api.get(`/api/training/dashboard/employee`, { params: { userId } }),
        api.get(`/api/training/requests/user/${userId}`),
        api.get(`/api/training/sessions`),
        api.get(`/api/training/sessions/registered/${userId}`)
      ])
        .then(([statsRes, requestsRes, sessionsRes, registeredRes]) => {
          console.log(registeredRes.data)
          if (!isMounted) return;
          setStats(statsRes.data || {});
          setRecentRequests(requestsRes.data.slice(0, 5));
          setRegisteredSessions(registeredRes.data || []);
          const now = new Date();
          setUpcomingSessions(
            (sessionsRes.data || []).filter(
              s =>
                s.status === 'scheduled' &&
                new Date(s.startDate) > now
            ).slice(0, 5).map(s => ({
              ...s,
              registered: (registeredRes.data || []).some(r => r.id === s.id)
            }))
          );
        })
        .catch(() => {
          if (isMounted) setError('Failed to load dashboard data.');
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    } else if (currentView === 'mytrainings') {
      Promise.all([
        api.get(`/api/training/requests/user/${userId}`),
        api.get(`/api/training/sessions/registered/${userId}`),
        api.get(`/api/training/sessions`),
        api.get(`/api/training/sessions/as-trainer/${userId}`)
      ])
        .then(([reqRes, regRes, allSessionsRes, trainerSessionsRes]) => {
          setMyRequests(reqRes.data);
          // Merge session details for registered sessions
          const allSessions = allSessionsRes.data || [];
          const regSessions = (regRes.data || []).map(reg => {
            const session = allSessions.find(s => s.id === reg.sessionId);
            return session ? { ...session } : { ...reg };
          });
          setRegisteredSessions(regSessions);
          setTrainerSessions(trainerSessionsRes.data || []);
        })
        .catch(() => setError('Failed to load your training requests.'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => { isMounted = false; };
  }, [currentView, userId]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
    setFormSuccess('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    setFormSuccess('');
    try {
      const payload = {
        ...form,
        requesterId: userId,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      await api.post('/api/training/requests', payload);
      setFormSuccess('Request submitted successfully!');
      setForm({ title: '', department: '', trainingType: '' });
      setCurrentView('dashboard');
    } catch (err) {
      setFormError('Failed to submit request.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleRegister = async (sessionId) => {
    try {
      await api.post(`/api/training/sessions/${sessionId}/register/${userId}`);
      // Re-fetch registered sessions after registering
      const registeredRes = await api.get(`/api/training/sessions/registered/${userId}`);
      setRegisteredSessions(registeredRes.data || []);
      setUpcomingSessions(prev => prev.map(s =>
        s.Id === sessionId ? { ...s, registered: true } : s
      ));
    } catch (err) {
      alert('Failed to register for session.');
    }
  };

  const reloadTrainerSessions = async () => {
    const res = await api.get(`/api/training/sessions/as-trainer/${userId}`);
    setTrainerSessions(res.data || []);
  };

  let content;
  if (currentView === 'request') {
    content = (
      <EmployeeNewRequest
        form={form}
        formLoading={formLoading}
        formError={formError}
        formSuccess={formSuccess}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
      />
    );
  } else if (currentView === 'mytrainings') {
    content = (
      <EmployeeMyTrainings
        myRequests={myRequests}
        registeredSessions={registeredSessions}
        trainerSessions={trainerSessions}
        loading={loading}
        error={error}
        reloadTrainerSessions={reloadTrainerSessions}
      />
    );
  } else if (currentView === 'notifications') {
    content = <EmployeeNotifications />;
  } else {
    content = (
      <EmployeeDashboardHome
        stats={stats}
        recentRequests={recentRequests}
        upcomingSessions={upcomingSessions}
        loading={loading}
        error={error}
        onRegister={handleRegister}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
        <button 
          onClick={() => setCurrentView('request')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          New Request
        </button>
      </div>
      {content}
    </div>
  );
};

export default EmployeeDashboard;

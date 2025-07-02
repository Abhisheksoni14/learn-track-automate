import React, { useState, useEffect } from 'react';
import api from '../../lib/axios';

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', department: '', roleId: 2 });
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/users');
      setUsers(res.data);
    } catch {
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (editingId) {
        await api.put(`/api/users/${editingId}`, { ...form, id: editingId });
      } else {
        await api.post('/api/users', form);
      }
      setForm({ name: '', email: '', department: '', roleId: 2 });
      setEditingId(null);
      fetchUsers();
    } catch {
      alert('Failed to save user.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (user) => {
    setForm({
      name: user.Name || user.name || '',
      email: user.Email || user.email || '',
      department: user.Department || user.department || '',
      roleId: user.RoleId || user.roleId || 2,
    });
    setEditingId(user.Id || user.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/api/users/${id}`);
      fetchUsers();
    } catch {
      alert('Failed to delete user.');
    }
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm('Deactivate this user?')) return;
    try {
      await api.put(`/api/users/${id}/deactivate`);
      fetchUsers();
    } catch {
      alert('Failed to deactivate user.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="px-3 py-2 border rounded w-1/4"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-3 py-2 border rounded w-1/4"
            required
          />
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
            className="px-3 py-2 border rounded w-1/4"
          />
          <select
            name="roleId"
            value={form.roleId}
            onChange={handleChange}
            className="px-3 py-2 border rounded w-1/4"
          >
            <option value={1}>Admin</option>
            <option value={2}>Employee</option>
            <option value={3}>L&D</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            disabled={formLoading}
          >
            {editingId ? 'Update User' : 'Add User'}
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              onClick={() => { setEditingId(null); setForm({ name: '', email: '', department: '', roleId: 2 }); }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.Id || user.id} className="border-b">
                  <td className="px-4 py-2">{user.Name || user.name}</td>
                  <td className="px-4 py-2">{user.Email || user.email}</td>
                  <td className="px-4 py-2">{user.Department || user.department}</td>
                  <td className="px-4 py-2">{(user.RoleId || user.roleId) === 1 ? 'Admin' : (user.RoleId || user.roleId) === 2 ? 'Employee' : 'L&D'}</td>
                  <td className="px-4 py-2">{user.IsActive !== undefined ? (user.IsActive ? 'Active' : 'Inactive') : (user.isActive ? 'Active' : 'Inactive')}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(user.Id || user.id)}
                    >
                      Delete
                    </button>
                    {(user.IsActive || user.isActive) && (
                      <button
                        className="text-yellow-600 hover:underline"
                        onClick={() => handleDeactivate(user.Id || user.id)}
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

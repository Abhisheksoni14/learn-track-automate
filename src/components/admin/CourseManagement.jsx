import React, { useState, useEffect } from 'react';
import api from '../../lib/axios';

export const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', description: '', department: '' });
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/courses');
      setCourses(res.data);
    } catch {
      setError('Failed to load courses.');
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
        await api.put(`/api/courses/${editingId}`, { ...form, id: editingId });
      } else {
        await api.post('/api/courses', form);
      }
      setForm({ name: '', description: '', department: '' });
      setEditingId(null);
      fetchCourses();
    } catch {
      alert('Failed to save course.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (course) => {
    setForm({
      name: course.Name,
      description: course.Description,
      department: course.Department,
    });
    setEditingId(course.Id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await api.delete(`/api/courses/${id}`);
      fetchCourses();
    } catch {
      alert('Failed to delete course.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Management</h3>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Course Name"
            className="px-3 py-2 border rounded w-1/4"
            required
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="px-3 py-2 border rounded w-1/2"
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
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            disabled={formLoading}
          >
            {editingId ? 'Update Course' : 'Add Course'}
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              onClick={() => { setEditingId(null); setForm({ name: '', description: '', department: '' }); }}
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
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.Id} className="border-b">
                  <td className="px-4 py-2">{course.name}</td>
                  <td className="px-4 py-2">{course.description}</td>
                  <td className="px-4 py-2">{course.department}</td>
                  <td className="px-4 py-2">{course.isActive ? 'Active' : 'Inactive'}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
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

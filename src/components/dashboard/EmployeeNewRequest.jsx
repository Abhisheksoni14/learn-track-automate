import React from 'react';

const EmployeeNewRequest = ({ form, formLoading, formError, formSuccess, handleFormChange, handleFormSubmit }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-lg mx-auto">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">New Training Request</h3>
    {formError && <div className="mb-2 text-red-600 text-sm">{formError}</div>}
    {formSuccess && <div className="mb-2 text-green-600 text-sm">{formSuccess}</div>}
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleFormChange}
          required
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Training Title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleFormChange}
          required
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Department"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Training Type</label>
        <input
          type="text"
          name="trainingType"
          value={form.trainingType}
          onChange={handleFormChange}
          required
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Type (e.g. Technical, Soft Skills)"
        />
      </div>
      <button
        type="submit"
        disabled={formLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full"
      >
        {formLoading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  </div>
);

export default EmployeeNewRequest; 
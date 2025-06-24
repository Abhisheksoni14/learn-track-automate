
import { useState } from 'react';
import { ArrowLeft, UserPlus, Mail, Key } from 'lucide-react';

interface InviteTrainersProps {
  onBack: () => void;
}

export const InviteTrainers = ({ onBack }: InviteTrainersProps) => {
  const [inviteType, setInviteType] = useState<'internal' | 'external'>('internal');
  const [formData, setFormData] = useState({
    email: '',
    trainingTitle: '',
    sessionDate: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Trainer invitation:', { type: inviteType, ...formData });
    alert(`${inviteType === 'internal' ? 'Internal' : 'External'} trainer invited successfully!`);
    setFormData({ email: '', trainingTitle: '', sessionDate: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Invite Trainers</h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Trainer Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Trainer Type
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setInviteType('internal')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                inviteType === 'internal'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              Internal Employee
            </button>
            <button
              type="button"
              onClick={() => setInviteType('external')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                inviteType === 'external'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              External Trainer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {inviteType === 'internal' ? 'Employee Email' : 'Trainer Email'} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={inviteType === 'internal' ? 'employee@company.com' : 'trainer@external.com'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Session *
              </label>
              <select
                name="trainingTitle"
                value={formData.trainingTitle}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Training Session</option>
                <option value="react-advanced">React Advanced Workshop</option>
                <option value="devops-fundamentals">DevOps Fundamentals</option>
                <option value="leadership-skills">Leadership Skills Development</option>
                <option value="data-science">Data Science Basics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Date *
              </label>
              <input
                type="datetime-local"
                name="sessionDate"
                value={formData.sessionDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-end">
              {inviteType === 'external' && (
                <div className="w-full p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <Key className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">
                      Login key will be auto-generated
                    </span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    External trainer will receive unique login credentials via email
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invitation Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a personal message to the invitation (optional)"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </button>
          </div>
        </form>
      </div>

      {/* Recent Invitations */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Trainer Invitations</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div>
              <p className="font-medium text-gray-900">sarah.trainer@external.com</p>
              <p className="text-sm text-gray-600">React Advanced Workshop - June 28, 2024</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Accepted
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <div>
              <p className="font-medium text-gray-900">john.smith@company.com</p>
              <p className="text-sm text-gray-600">DevOps Fundamentals - July 2, 2024</p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export const Header = ({ user, currentRole, onLogout }) => {
  const navigate = useNavigate();

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'employee':
        return 'Employee Portal';
      case 'ld':
      case 'l&d':
        return 'L&D Team Portal';
      case 'admin':
        return 'Admin Portal';
      default:
        return 'Portal';
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {getRoleDisplayName(currentRole)}
          </h2>
          <p className="text-sm text-gray-500">Training Request Management System</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
              <p className="text-gray-500">{user?.email || 'user@company.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


export const Header = ({ currentRole, setCurrentRole, setCurrentView }) => {
  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'employee':
        return 'Employee Portal';
      case 'ld':
        return 'L&D Team Portal';
      case 'admin':
        return 'Admin Portal';
      default:
        return 'Portal';
    }
  };

  const handleRoleSwitch = (newRole) => {
    setCurrentRole(newRole);
    setCurrentView('dashboard');
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
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['employee', 'ld', 'admin'].map((role) => (
              <button
                key={role}
                onClick={() => handleRoleSwitch(role)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  currentRole === role
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {role === 'ld' ? 'L&D' : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">Demo User</p>
              <p className="text-gray-500">user@company.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

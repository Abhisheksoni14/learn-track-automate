
interface ModernHeaderProps {
  currentRole: 'employee' | 'ld' | 'admin';
  setCurrentRole: (role: 'employee' | 'ld' | 'admin') => void;
  setCurrentView: (view: string) => void;
}

export const ModernHeader = ({ currentRole, setCurrentRole, setCurrentView }: ModernHeaderProps) => {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'employee':
        return 'Learner Portal';
      case 'ld':
        return 'L&D Command Center';
      case 'admin':
        return 'System Control';
      default:
        return 'Neural Hub';
    }
  };

  const handleRoleSwitch = (newRole: 'employee' | 'ld' | 'admin') => {
    setCurrentRole(newRole);
    setCurrentView('dashboard');
  };

  return (
    <header className="bg-slate-800/40 backdrop-blur-2xl border-b border-slate-700/50 shadow-2xl">
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {getRoleDisplayName(currentRole)}
          </h2>
          <p className="text-slate-400 font-medium">
            Advanced Training Management Ecosystem
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Role Switcher */}
          <div className="flex bg-slate-800/60 rounded-2xl p-2 border border-slate-600/30">
            {(['employee', 'ld', 'admin'] as const).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleSwitch(role)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  currentRole === role
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {role === 'ld' ? 'L&D' : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-4 bg-slate-800/60 rounded-2xl p-4 border border-slate-600/30">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">DU</span>
            </div>
            <div>
              <p className="font-bold text-white">Demo User</p>
              <p className="text-slate-400 text-sm">Neural Access Level 5</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

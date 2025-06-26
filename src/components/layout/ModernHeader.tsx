
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
    <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-200/60 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {getRoleDisplayName(currentRole)}
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            Advanced Training Management Ecosystem
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Role Switcher */}
          <div className="flex bg-white/70 rounded-xl p-1.5 border border-slate-200/60 shadow-sm">
            {(['employee', 'ld', 'admin'] as const).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleSwitch(role)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                  currentRole === role
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {role === 'ld' ? 'L&D' : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3 bg-white/70 rounded-xl p-3 border border-slate-200/60 shadow-sm">
            <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">DU</span>
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Demo User</p>
              <p className="text-slate-500 text-xs">Access Level 5</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

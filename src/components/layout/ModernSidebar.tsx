
import { Calendar, FileText, Users, Settings, BarChart3, Bell, Home, BookOpen, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModernSidebarProps {
  currentRole: 'employee' | 'ld' | 'admin';
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const ModernSidebar = ({ currentRole, currentView, setCurrentView }: ModernSidebarProps) => {
  const getMenuItems = () => {
    switch (currentRole) {
      case 'employee':
        return [
          { id: 'dashboard', label: 'Overview', icon: Home, description: 'Dashboard' },
          { id: 'request', label: 'Request', icon: FileText, description: 'New Training' },
          { id: 'mytrainings', label: 'Learning', icon: BookOpen, description: 'My Progress' },
          { id: 'notifications', label: 'Updates', icon: Bell, description: 'Notifications' },
        ];
      case 'ld':
        return [
          { id: 'dashboard', label: 'Control', icon: BarChart3, description: 'Dashboard' },
          { id: 'requests', label: 'Manage', icon: FileText, description: 'Requests' },
          { id: 'trainers', label: 'Network', icon: Users, description: 'Trainers' },
          { id: 'calendar', label: 'Schedule', icon: Calendar, description: 'Calendar' },
          { id: 'reports', label: 'Analytics', icon: BarChart3, description: 'Reports' },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Command', icon: BarChart3, description: 'Dashboard' },
          { id: 'users', label: 'People', icon: Users, description: 'Management' },
          { id: 'courses', label: 'Content', icon: Award, description: 'Courses' },
          { id: 'settings', label: 'System', icon: Settings, description: 'Settings' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="sidebar-modern w-64 z-50">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">अ</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 pulse-glow"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white mb-1">अभ्यास</h1>
            <p className="text-slate-400 text-xs font-medium">Neural Learning Hub</p>
          </div>
        </div>
      </div>
      
      {/* Role Badge */}
      <div className="px-6 py-3">
        <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl p-3 border border-emerald-500/30">
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            Current Mode
          </p>
          <p className="text-white font-bold text-sm">
            {currentRole === 'ld' ? 'L&D Specialist' : 
             currentRole === 'admin' ? 'System Admin' : 'Learner'}
          </p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="px-4 flex-1">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  "w-full group relative overflow-hidden rounded-xl p-3 text-left transition-all duration-300 hover:scale-105",
                  isActive
                    ? "bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border border-emerald-500/50 shadow-lg"
                    : "bg-slate-800/30 hover:bg-slate-700/40 border border-slate-700/30"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-r-full"></div>
                )}
                
                {/* Content */}
                <div className="flex items-center space-x-3 relative z-10">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"
                      : "bg-slate-700/50 group-hover:bg-slate-600/50"
                  )}>
                    <Icon className={cn(
                      "w-4 h-4 transition-colors duration-300",
                      isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                    )} />
                  </div>
                  
                  <div className="flex-1">
                    <p className={cn(
                      "font-bold text-sm transition-colors duration-300",
                      isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                    )}>
                      {item.label}
                    </p>
                    <p className={cn(
                      "text-xs transition-colors duration-300",
                      isActive ? "text-emerald-200" : "text-slate-500 group-hover:text-slate-400"
                    )}>
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300",
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-slate-500 group-hover:text-slate-300 group-hover:bg-slate-600/30"
                  )}>
                    →
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            );
          })}
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="bg-slate-800/50 rounded-xl p-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">U</span>
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Demo User</p>
              <p className="text-slate-400 text-xs">Premium Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

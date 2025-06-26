
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
    <div className="sidebar-modern w-80 z-50">
      {/* Header */}
      <div className="p-8 border-b border-slate-700/50">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-2xl">अ</span>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900 pulse-glow"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">अभ्यास</h1>
            <p className="text-slate-400 text-sm font-medium">Neural Learning Hub</p>
          </div>
        </div>
      </div>
      
      {/* Role Badge */}
      <div className="px-8 py-4">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-4 border border-blue-500/30">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            Current Mode
          </p>
          <p className="text-white font-bold text-lg">
            {currentRole === 'ld' ? 'L&D Specialist' : 
             currentRole === 'admin' ? 'System Admin' : 'Learner'}
          </p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="px-6 flex-1">
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  "w-full group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 hover:scale-105",
                  isActive
                    ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 shadow-xl"
                    : "bg-slate-800/30 hover:bg-slate-700/40 border border-slate-700/30"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>
                )}
                
                {/* Content */}
                <div className="flex items-center space-x-4 relative z-10">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg"
                      : "bg-slate-700/50 group-hover:bg-slate-600/50"
                  )}>
                    <Icon className={cn(
                      "w-6 h-6 transition-colors duration-300",
                      isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                    )} />
                  </div>
                  
                  <div className="flex-1">
                    <p className={cn(
                      "font-bold text-lg transition-colors duration-300",
                      isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                    )}>
                      {item.label}
                    </p>
                    <p className={cn(
                      "text-sm transition-colors duration-300",
                      isActive ? "text-blue-200" : "text-slate-500 group-hover:text-slate-400"
                    )}>
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-slate-500 group-hover:text-slate-300 group-hover:bg-slate-600/30"
                  )}>
                    →
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            );
          })}
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-6 border-t border-slate-700/50">
        <div className="bg-slate-800/50 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Demo User</p>
              <p className="text-slate-400 text-xs">Premium Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

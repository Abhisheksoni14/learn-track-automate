
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
    <div className="sidebar-light w-56 z-50">
      {/* Header */}
      <div className="p-5 border-b border-slate-200/60">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-base">अ</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white pulse-glow-light"></div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 mb-1">अभ्यास</h1>
            <p className="text-slate-500 text-xs font-medium">Learning Hub</p>
          </div>
        </div>
      </div>
      
      {/* Role Badge */}
      <div className="px-5 py-3">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200/60">
          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-1">
            Current Mode
          </p>
          <p className="text-slate-800 font-bold text-sm">
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
                    ? "bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 shadow-md"
                    : "bg-white/40 hover:bg-white/60 border border-slate-200/40"
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
                    "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-sm"
                      : "bg-slate-100 group-hover:bg-slate-200"
                  )}>
                    <Icon className={cn(
                      "w-3.5 h-3.5 transition-colors duration-300",
                      isActive ? "text-white" : "text-slate-600 group-hover:text-slate-700"
                    )} />
                  </div>
                  
                  <div className="flex-1">
                    <p className={cn(
                      "font-bold text-sm transition-colors duration-300",
                      isActive ? "text-slate-800" : "text-slate-600 group-hover:text-slate-800"
                    )}>
                      {item.label}
                    </p>
                    <p className={cn(
                      "text-xs transition-colors duration-300",
                      isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-500"
                    )}>
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className={cn(
                    "w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 text-xs",
                    isActive 
                      ? "bg-white/30 text-slate-700" 
                      : "text-slate-400 group-hover:text-slate-500 group-hover:bg-slate-100"
                  )}>
                    →
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            );
          })}
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-200/60">
        <div className="bg-white/50 rounded-xl p-3 border border-slate-200/40">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">U</span>
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-xs">Demo User</p>
              <p className="text-slate-500 text-xs">Premium Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

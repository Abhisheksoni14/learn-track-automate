
import { Calendar, FileText, Users, Settings, BarChart3, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar = ({ currentRole, currentView, setCurrentView }) => {
  const getMenuItems = () => {
    switch (currentRole) {
      case 'employee':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'request', label: 'New Request', icon: FileText },
          { id: 'mytrainings', label: 'My Trainings', icon: Calendar },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ];
      case 'ld':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'requests', label: 'Manage Requests', icon: FileText },
          { id: 'trainers', label: 'Invite Trainers', icon: Users },
          { id: 'calendar', label: 'Training Calendar', icon: Calendar },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'courses', label: 'Course Management', icon: FileText }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">अ</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">अभ्यास</h1>
            <p className="text-sm text-gray-500">Training Portal</p>
          </div>
        </div>
      </div>
      
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                currentView === item.id
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

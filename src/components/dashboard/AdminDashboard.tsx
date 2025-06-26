
import { MetricWidget } from '../ui/MetricWidget';
import { Users, FileText, Settings, Shield, Server, Database, Activity } from 'lucide-react';
import { UserManagement } from '../admin/UserManagement';
import { CourseManagement } from '../admin/CourseManagement';
import { SystemSettings } from '../admin/SystemSettings';

interface AdminDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const AdminDashboard = ({ currentView, setCurrentView }: AdminDashboardProps) => {
  const renderContent = () => {
    switch (currentView) {
      case 'users':
        return <UserManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return (
          <>
            {/* Metric Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <MetricWidget
                title="Neural Network Users"
                value="245"
                icon={Users}
                trend="+12"
                trendDirection="up"
                color="blue"
              />
              <MetricWidget
                title="Active Neural Paths"
                value="68"
                icon={FileText}
                trend="+8"
                trendDirection="up"
                color="green"
              />
              <MetricWidget
                title="System Neural Health"
                value="99.9%"
                icon={Shield}
                trend="0.1%"
                trendDirection="up"
                color="purple"
              />
              <MetricWidget
                title="Neural Configurations"
                value="12"
                icon={Settings}
                trend="+2"
                trendDirection="up"
                color="orange"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* System Neural Matrix */}
              <div className="neon-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">System Neural Matrix</h3>
                </div>
                <div className="space-y-4">
                  <div className="glass-panel p-6 hover:scale-105 transition-all duration-300 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white text-lg">Neural Database Core</span>
                        <p className="text-slate-400 mt-1">Primary data matrix operational</p>
                      </div>
                      <span className="text-green-400 font-bold bg-green-500/20 px-3 py-1 rounded-full text-sm border border-green-500/30">
                        OPTIMAL
                      </span>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-6 hover:scale-105 transition-all duration-300 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white text-lg">Communication Neural Net</span>
                        <p className="text-slate-400 mt-1">Message relay systems active</p>
                      </div>
                      <span className="text-blue-400 font-bold bg-blue-500/20 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-6 hover:scale-105 transition-all duration-300 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white text-lg">SSO Neural Gateway</span>
                        <p className="text-slate-400 mt-1">Authentication matrix synchronized</p>
                      </div>
                      <span className="text-purple-400 font-bold bg-purple-500/20 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                        SYNCED
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Neural Activity Stream */}
              <div className="neon-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Neural Activity Stream</h3>
                </div>
                <div className="space-y-4">
                  <div className="glass-panel p-4 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full pulse-glow"></div>
                      <div className="flex-1">
                        <p className="text-white font-medium">New neural entity registered</p>
                        <p className="text-slate-400 text-sm">alice.johnson@company.com joined the network</p>
                      </div>
                      <span className="text-xs text-slate-500">2m ago</span>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-4 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full pulse-glow"></div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Neural path "Data Science 101" activated</p>
                        <p className="text-slate-400 text-sm">New learning module published to network</p>
                      </div>
                      <span className="text-xs text-slate-500">5m ago</span>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-4 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full pulse-glow"></div>
                      <div className="flex-1">
                        <p className="text-white font-medium">System neural backup completed</p>
                        <p className="text-slate-400 text-sm">Data integrity matrix verified successfully</p>
                      </div>
                      <span className="text-xs text-slate-500">15m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            System Control Matrix
          </h1>
          <p className="text-slate-400 text-lg">Master control for the neural learning ecosystem</p>
        </div>
        <button 
          onClick={() => setCurrentView('settings')}
          className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-semibold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105"
          style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}
        >
          Neural System Config
        </button>
      </div>

      {renderContent()}
    </div>
  );
};


import { MetricWidget } from '../ui/MetricWidget';
import { ManageRequests } from '../ld/ManageRequests';
import { InviteTrainers } from '../ld/InviteTrainers';
import { TrainingCalendar } from '../ld/TrainingCalendar';
import { Reports } from '../ld/Reports';
import { FileText, Users, Calendar, CheckCircle, TrendingUp, Brain } from 'lucide-react';

interface LDDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const LDDashboard = ({ currentView, setCurrentView }: LDDashboardProps) => {
  if (currentView === 'requests') {
    return <ManageRequests onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'trainers') {
    return <InviteTrainers onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'calendar') {
    return <TrainingCalendar onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'reports') {
    return <Reports onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            L&D Command Center
          </h1>
          <p className="text-slate-400 text-lg">Orchestrate learning experiences across the neural network</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView('requests')}
            className="neon-button"
          >
            Process Requests
          </button>
          <button
            onClick={() => setCurrentView('trainers')}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
          >
            Neural Network
          </button>
        </div>
      </div>

      {/* Metric Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricWidget
          title="Queue Status"
          value="15"
          icon={FileText}
          trend="+3"
          trendDirection="up"
          color="yellow"
        />
        <MetricWidget
          title="Active Neural Guides"
          value="28"
          icon={Users}
          trend="+5"
          trendDirection="up"
          color="blue"
        />
        <MetricWidget
          title="Live Sessions"
          value="12"
          icon={Calendar}
          trend="+2"
          trendDirection="up"
          color="green"
        />
        <MetricWidget
          title="Monthly Completions"
          value="34"
          icon={CheckCircle}
          trend="+18%"
          trendDirection="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Neural Request Analysis */}
        <div className="neon-card p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Neural Request Analysis</h3>
          </div>
          <div className="space-y-4">
            <div className="glass-panel p-6 hover:scale-105 transition-all duration-300 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold text-white text-lg">Machine Learning Neural Path</h4>
                  <p className="text-slate-400">Initiated by John Doe - Engineering Sector</p>
                </div>
                <span className="px-4 py-2 rounded-xl text-sm font-bold text-yellow-400 bg-yellow-500/20 border border-yellow-500/30">
                  Neural Processing
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <TrendingUp className="w-4 h-4" />
                <span>Priority Level: High Neural Impact</span>
              </div>
            </div>
            
            <div className="glass-panel p-6 hover:scale-105 transition-all duration-300 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold text-white text-lg">Leadership Neural Enhancement</h4>
                  <p className="text-slate-400">Initiated by Sarah Smith - Command Division</p>
                </div>
                <span className="px-4 py-2 rounded-xl text-sm font-bold text-blue-400 bg-blue-500/20 border border-blue-500/30">
                  Tech Neural Approved
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <CheckCircle className="w-4 h-4" />
                <span>Ready for Neural Implementation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Command Operations */}
        <div className="neon-card p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Neural Command Operations</h3>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView('requests')}
              className="w-full glass-panel p-6 text-left hover:scale-105 transition-all duration-300 hover:bg-slate-700/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-lg">Process Neural Requests</span>
                  <p className="text-slate-400 mt-1">15 requests awaiting neural analysis</p>
                </div>
                <div className="text-yellow-400 bg-yellow-500/20 px-3 py-1 rounded-full text-sm font-bold border border-yellow-500/30">
                  15 pending
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setCurrentView('calendar')}
              className="w-full glass-panel p-6 text-left hover:scale-105 transition-all duration-300 hover:bg-slate-700/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-lg">Neural Schedule Matrix</span>
                  <p className="text-slate-400 mt-1">Coordinate learning experiences</p>
                </div>
                <Calendar className="w-6 h-6 text-slate-400" />
              </div>
            </button>
            
            <button
              onClick={() => setCurrentView('reports')}
              className="w-full glass-panel p-6 text-left hover:scale-105 transition-all duration-300 hover:bg-slate-700/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-lg">Neural Analytics Hub</span>
                  <p className="text-slate-400 mt-1">Generate intelligence reports</p>
                </div>
                <FileText className="w-6 h-6 text-slate-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

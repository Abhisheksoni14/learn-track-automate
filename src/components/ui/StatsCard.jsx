
import { LucideIcon } from 'lucide-react';

export const StatsCard = ({ title, value, icon: Icon, color }) => {
  const getGradientClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-gradient-to-br from-blue-500 to-cyan-600 shadow-blue-500/25';
      case 'green':
        return 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/25';
      case 'yellow':
        return 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/25';
      case 'purple':
        return 'bg-gradient-to-br from-purple-500 to-violet-600 shadow-purple-500/25';
      case 'red':
        return 'bg-gradient-to-br from-red-500 to-pink-600 shadow-red-500/25';
      default:
        return 'bg-gradient-to-br from-slate-500 to-gray-600 shadow-slate-500/25';
    }
  };

  const getBgGradient = (color) => {
    switch (color) {
      case 'blue':
        return 'from-blue-50 to-cyan-50';
      case 'green':
        return 'from-emerald-50 to-green-50';
      case 'yellow':
        return 'from-amber-50 to-orange-50';
      case 'purple':
        return 'from-purple-50 to-violet-50';
      case 'red':
        return 'from-red-50 to-pink-50';
      default:
        return 'from-slate-50 to-gray-50';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getBgGradient(color)} rounded-2xl shadow-xl shadow-${color}-500/10 p-6 hover:shadow-2xl hover:shadow-${color}-500/20 transition-all duration-300 hover:-translate-y-1 border border-white/50 backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
        </div>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${getGradientClasses(color)} transition-transform duration-200 hover:scale-110`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

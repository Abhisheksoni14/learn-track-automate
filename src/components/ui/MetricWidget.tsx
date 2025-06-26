
import { LucideIcon } from 'lucide-react';

interface MetricWidgetProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down';
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red' | 'orange';
}

export const MetricWidget = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendDirection,
  color 
}: MetricWidgetProps) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          gradient: 'from-blue-500/20 to-cyan-500/20',
          iconBg: 'from-blue-500 to-cyan-500',
          accent: 'border-blue-500/30',
          glow: 'shadow-blue-500/20'
        };
      case 'green':
        return {
          gradient: 'from-emerald-500/20 to-green-500/20',
          iconBg: 'from-emerald-500 to-green-500',
          accent: 'border-emerald-500/30',
          glow: 'shadow-emerald-500/20'
        };
      case 'yellow':
        return {
          gradient: 'from-amber-500/20 to-yellow-500/20',
          iconBg: 'from-amber-500 to-yellow-500',
          accent: 'border-amber-500/30',
          glow: 'shadow-amber-500/20'
        };
      case 'purple':
        return {
          gradient: 'from-purple-500/20 to-violet-500/20',
          iconBg: 'from-purple-500 to-violet-500',
          accent: 'border-purple-500/30',
          glow: 'shadow-purple-500/20'
        };
      case 'red':
        return {
          gradient: 'from-red-500/20 to-pink-500/20',
          iconBg: 'from-red-500 to-pink-500',
          accent: 'border-red-500/30',
          glow: 'shadow-red-500/20'
        };
      case 'orange':
        return {
          gradient: 'from-orange-500/20 to-amber-500/20',
          iconBg: 'from-orange-500 to-amber-500',
          accent: 'border-orange-500/30',
          glow: 'shadow-orange-500/20'
        };
      default:
        return {
          gradient: 'from-slate-500/20 to-gray-500/20',
          iconBg: 'from-slate-500 to-gray-500',
          accent: 'border-slate-500/30',
          glow: 'shadow-slate-500/20'
        };
    }
  };

  const colors = getColorClasses(color);

  return (
    <div className={`metric-widget bg-gradient-to-br ${colors.gradient} ${colors.glow} shadow-2xl float-animation`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <p className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-4xl font-bold text-white tracking-tight">
                {value}
              </h3>
              {trend && (
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  trendDirection === 'up' 
                    ? 'text-green-400 bg-green-500/20' 
                    : 'text-red-400 bg-red-500/20'
                }`}>
                  {trendDirection === 'up' ? '↗' : '↘'} {trend}
                </span>
              )}
            </div>
          </div>
          
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${colors.iconBg} shadow-xl pulse-glow`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>
        
        {/* Bottom Accent Line */}
        <div className={`h-1 rounded-full bg-gradient-to-r ${colors.iconBg} opacity-60`}></div>
      </div>
    </div>
  );
};

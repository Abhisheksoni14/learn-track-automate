
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
          gradient: 'from-blue-50 to-cyan-50',
          iconBg: 'from-blue-500 to-cyan-500',
          accent: 'border-blue-200',
          glow: 'shadow-blue-500/10'
        };
      case 'green':
        return {
          gradient: 'from-emerald-50 to-green-50',
          iconBg: 'from-emerald-500 to-green-500',
          accent: 'border-emerald-200',
          glow: 'shadow-emerald-500/10'
        };
      case 'yellow':
        return {
          gradient: 'from-amber-50 to-yellow-50',
          iconBg: 'from-amber-500 to-yellow-500',
          accent: 'border-amber-200',
          glow: 'shadow-amber-500/10'
        };
      case 'purple':
        return {
          gradient: 'from-purple-50 to-violet-50',
          iconBg: 'from-purple-500 to-violet-500',
          accent: 'border-purple-200',
          glow: 'shadow-purple-500/10'
        };
      case 'red':
        return {
          gradient: 'from-red-50 to-pink-50',
          iconBg: 'from-red-500 to-pink-500',
          accent: 'border-red-200',
          glow: 'shadow-red-500/10'
        };
      case 'orange':
        return {
          gradient: 'from-orange-50 to-amber-50',
          iconBg: 'from-orange-500 to-amber-500',
          accent: 'border-orange-200',
          glow: 'shadow-orange-500/10'
        };
      default:
        return {
          gradient: 'from-slate-50 to-gray-50',
          iconBg: 'from-slate-500 to-gray-500',
          accent: 'border-slate-200',
          glow: 'shadow-slate-500/10'
        };
    }
  };

  const colors = getColorClasses(color);

  return (
    <div className={`metric-widget-light bg-gradient-to-br ${colors.gradient} ${colors.glow} shadow-lg float-animation hover:scale-105 transition-all duration-300`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-slate-600 text-xs font-medium mb-2 uppercase tracking-wider">
              {title}
            </p>
            <div className="flex items-baseline space-x-2 mb-2">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                {value}
              </h3>
              {trend && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  trendDirection === 'up' 
                    ? 'text-green-600 bg-green-100' 
                    : 'text-red-600 bg-red-100'
                }`}>
                  {trendDirection === 'up' ? '↗' : '↘'} {trend}
                </span>
              )}
            </div>
          </div>
          
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${colors.iconBg} shadow-md pulse-glow-light`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>
        
        {/* Bottom Accent Line */}
        <div className={`h-0.5 rounded-full bg-gradient-to-r ${colors.iconBg} opacity-40`}></div>
      </div>
    </div>
  );
};

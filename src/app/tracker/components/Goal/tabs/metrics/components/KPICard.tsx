import { KPI } from '@/app/tracker/types/metrics';
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface KPICardProps {
  kpi: KPI;
  onSelect?: (kpi: KPI) => void;
}

export const KPICard = ({ kpi, onSelect }: KPICardProps) => {
  const getTrendColor = () => {
    if (!kpi.trend) return '';
    return kpi.trend.isPositive ? 'text-green-400' : 'text-red-400';
  };

  const formatValue = (value: number) => {
    switch (kpi.type) {
      case 'percentage':
        return `${value}%`;
      case 'currency':
        return `${value}€`;
      default:
        return value;
    }
  };

  return (
    <Card 
      className="bg-white/5 border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
      onClick={() => onSelect?.(kpi)}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="text-sm text-white/60">{kpi.name}</div>
          <div className="text-2xl font-bold text-white">
            {formatValue(kpi.value)}
          </div>
          
          {kpi.trend && (
            <div className={`text-sm flex items-center gap-1 ${getTrendColor()}`}>
              {kpi.trend.direction === 'up' ? '↑' : '↓'}
              {Math.abs(kpi.trend.value)}%
            </div>
          )}

          {kpi.history && (
            <div className="h-10 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kpi.history}>
                  <defs>
                    <linearGradient id={`gradient-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={kpi.color || '#4F46E5'} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={kpi.color || '#4F46E5'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={kpi.color || '#4F46E5'}
                    fill={`url(#gradient-${kpi.id})`}
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 
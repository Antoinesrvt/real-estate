import { KPI } from '@/app/tracker/types/metrics';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface KPIDetailsProps {
  kpi: KPI;
}

export const KPIDetails = ({ kpi }: KPIDetailsProps) => {
  const formatValue = (value: number) => {
    switch (kpi.type) {
      case 'percentage':
        return `${value}%`;
      case 'currency':
        return `${value}€`;
      case 'time':
        return `${value}h`;
      default:
        return value;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="text-sm text-white/60">Valeur actuelle</div>
            <div className="text-2xl font-bold text-white mt-1">
              {formatValue(kpi.value)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="text-sm text-white/60">Objectif</div>
            <div className="text-2xl font-bold text-white mt-1">
              {formatValue(kpi.target)}
            </div>
          </CardContent>
        </Card>

        {kpi.trend && (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="text-sm text-white/60">Tendance</div>
              <div className={`text-2xl font-bold mt-1 ${
                kpi.trend.isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {kpi.trend.direction === 'up' ? '↑' : '↓'} {Math.abs(kpi.trend.value)}%
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {kpi.history && (
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="text-sm text-white/60 mb-4">Historique</div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpi.history}>
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.4)"
                    tickFormatter={(date) => format(new Date(date), 'dd MMM', { locale: fr })}
                  />
                  <YAxis stroke="rgba(255,255,255,0.4)" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-800 border border-white/10 p-2 rounded-lg">
                            <p className="text-white">
                              {format(new Date(payload[0].payload.date), 'PP', { locale: fr })}
                            </p>
                            <p className="text-white/60">
                              {formatValue(payload[0].value as number)}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={kpi.color || '#4F46E5'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 
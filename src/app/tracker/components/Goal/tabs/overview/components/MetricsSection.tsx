import { Clock, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { MetricsSectionProps } from '../types';

export const MetricsSection = ({ metrics, team }: MetricsSectionProps) => {
  const timeProgress = (metrics.time.timeSpent / metrics.time.estimated) * 100;
  const budgetProgress = (metrics.budget.spent / metrics.budget.allocated) * 100;

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-white/60">Temps passé</span>
          <span className="text-white">
            {metrics.time.timeSpent}h
          </span>
        </div>
        <Progress value={timeProgress} className="h-2" />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-white/60">Budget utilisé</span>
          <span className="text-white">
            {Math.round(budgetProgress)}%
          </span>
        </div>
        <Progress value={budgetProgress} className="h-2" />
      </div>
    </div>
  );
}; 
'use client'
  
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { GoalDetails, TypeStyles } from '@/app/tracker/types/goals';
import { KPI } from '@/app/tracker/types/metrics';
import { MetricsOverview } from './metrics/components/MetricsOverview';
import { KPICard } from './metrics/components/KPICard';
import { PerformanceMetrics } from './metrics/components/PerformanceMetrics';
import { KPIDetails } from './metrics/components/KPIDetails';
import { AddKPIForm } from './metrics/components/AddKPIForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MetricsTabProps, TimeRange } from './metrics/types';
import { useMetricsFilters } from '@/hooks/use-metrics-filters';
import { useMetricsCalculations } from '@/hooks/use-metrics-calculations';
import { timeRangeOptions } from './metrics/constants';

export default function MetricsTab({
  goalDetails,
  styles,
  onAddKPI,
  onUpdateKPI,
  onDeleteKPI,
}: MetricsTabProps) {
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [showAddKPIDialog, setShowAddKPIDialog] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('1m');

  const handleAddKPI = (kpi: Omit<KPI, 'id'>) => {
    onAddKPI?.(kpi);
    setShowAddKPIDialog(false);
  };

  const kpiAnimationVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Métriques & KPIs
          </h3>
          <p className="text-sm text-white/60">
            Suivez la progression et les indicateurs clés du projet
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/10">
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="bg-white/5 hover:bg-white/10 text-white border-white/10"
            onClick={() => setShowAddKPIDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un KPI
          </Button>
        </div>
      </div>

      {/* Overview Section */}
      <MetricsOverview metrics={goalDetails.metrics} />

      {/* Performance Section */}
      {goalDetails.metrics.performance && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Performance</h4>
          <PerformanceMetrics performance={goalDetails.metrics.performance} />
        </div>
      )}

      {/* KPIs Grid */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">KPIs</h4>
        <div className="grid grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {goalDetails.kpis.map((kpi) => (
              <motion.div
                key={kpi.id}
                layout
                variants={kpiAnimationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <KPICard kpi={kpi} onSelect={(kpi) => setSelectedKPI(kpi)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* KPI Details Dialog */}
      <Dialog open={!!selectedKPI} onOpenChange={() => setSelectedKPI(null)}>
        <DialogContent className="bg-slate-800 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedKPI?.name}</DialogTitle>
          </DialogHeader>
          {selectedKPI && <KPIDetails kpi={selectedKPI} />}
        </DialogContent>
      </Dialog>

      {/* Add KPI Dialog */}
      <Dialog open={showAddKPIDialog} onOpenChange={setShowAddKPIDialog}>
        <DialogContent className="bg-slate-800 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">
              Ajouter un nouveau KPI
            </DialogTitle>
          </DialogHeader>
          <AddKPIForm
            onSubmit={handleAddKPI}
            onCancel={() => setShowAddKPIDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
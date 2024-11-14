'use client'
  
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Clock, BarChart3, Target, Plus, MoreVertical } from 'lucide-react'
import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { Goal, GoalDetails, KPI } from '@/app/tracker/types'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResponsiveContainer, XAxis, YAxis, Area, AreaChart, LineChart, ComposedChart, Tooltip, Bar, Line } from "recharts";
import { format } from 'date-fns'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog'
import { calculatePredictions } from '@/lib/metrics'


interface MetricsTabProps {
  goalDetails: GoalDetails & {
    kpis: KPI[];
    historicalData: {
      tasks: Array<{ date: string; completed: number; total: number }>;
      budget: Array<{ date: string; spent: number }>;
      time: Array<{ date: string; spent: number }>;
    };
  };
  onAddKPI?: (kpi: Omit<KPI, "id">) => void;
  onUpdateKPI?: (kpi: KPI) => void;
  onDeleteKPI?: (kpiId: string) => void;
  styles?: {
    background?: string;
    text?: string;
  };
}

export default function MetricsTab({
  goalDetails,
  onAddKPI,
  onUpdateKPI,
  onDeleteKPI,
  styles,
}: MetricsTabProps) {
  const [showKPIDialog, setShowKPIDialog] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    "1w" | "1m" | "3m" | "6m" | "1y"
  >("1m");
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Move predictions calculation into a useEffect to avoid hydration mismatch
  const [predictionsData, setPredictionsData] = useState(() => calculatePredictions(goalDetails.historicalData));

  useEffect(() => {
    setPredictionsData(calculatePredictions(goalDetails.historicalData));
  }, [goalDetails.historicalData]);

  // Create a memoized date formatter to ensure consistent formatting
  const formatDate = useCallback((date: string) => {
    return format(new Date(date), "MMM dd");
  }, []);

  return (
    <div className="space-y-8">
      {/* En-tête avec actions */}
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
          <Select
            value={selectedTimeRange}
            onValueChange={(value: any) => setSelectedTimeRange(value)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/10 text-white w-32">
              <SelectItem value="1w">7 derniers jours</SelectItem>
              <SelectItem value="1m">30 derniers jours</SelectItem>
              <SelectItem value="3m">3 derniers mois</SelectItem>
              <SelectItem value="6m">6 derniers mois</SelectItem>
              <SelectItem value="1y">Année</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => setShowKPIDialog(true)}
            className={`${styles?.background} ${styles?.text}`}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un KPI
          </Button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-white/60">Temps</h4>
              <Clock className="h-5 w-5 text-white/40" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-white mb-1">
                  {goalDetails.metrics.time.timeSpent}h
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-white/40">
                    sur{" "}
                    {goalDetails.metrics.time.timeSpent +
                      goalDetails.metrics.time.estimatedTimeLeft}
                    h estimées
                  </div>
                  {predictionsData.time.trend > 0 ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                      +{predictionsData.time.trend}% vs prévu
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                      {predictionsData.time.trend}% vs prévu
                    </span>
                  )}
                </div>
              </div>
              <Progress
                value={
                  (goalDetails.metrics.time.timeSpent /
                    (goalDetails.metrics.time.timeSpent +
                      goalDetails.metrics.time.estimatedTimeLeft)) *
                  100
                }
                className="h-2"
              />
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={goalDetails.historicalData.time}>
                  <Area
                    type="monotone"
                    dataKey="spent"
                    stroke="rgba(255, 255, 255, 0.2)"
                    fill="rgba(255, 255, 255, 0.05)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cartes similaires pour Budget et Objectifs */}
      </div>

      {/* Graphiques détaillés */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Progression des tâches</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={goalDetails.historicalData.tasks}>
                <XAxis
                  dataKey="date"
                  stroke="rgba(255, 255, 255, 0.4)"
                  tickFormatter={formatDate}
                />
                <YAxis stroke="rgba(255, 255, 255, 0.4)" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-800 border border-white/10 p-2 rounded-lg">
                          <p className="text-white">
                            {format(new Date(payload[0].payload.date), "PP")}
                          </p>
                          <p className="text-white/60">
                            {payload[0].value} tâches complétées
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#60A5FA"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Tendance budgétaire</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={goalDetails.historicalData.budget}>
                <XAxis
                  dataKey="date"
                  stroke="rgba(255, 255, 255, 0.4)"
                  tickFormatter={formatDate}
                />
                <YAxis stroke="rgba(255, 255, 255, 0.4)" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-800 border border-white/10 p-2 rounded-lg">
                          <p className="text-white">
                            {format(new Date(payload[0].payload.date), "PP")}
                          </p>
                          <p className="text-white/60">
                            {payload[0].value?.toLocaleString()}€ dépensés
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="spent" fill="rgba(96, 165, 250, 0.2)" />
                <Line
                  type="monotone"
                  dataKey="spent"
                  stroke="#60A5FA"
                  strokeWidth={2}
                />
                {/* Ligne de prévision */}
                <Line
                  type="monotone"
                  dataKey="prediction"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeDasharray="4 4"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* KPIs personnalisés */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">KPIs personnalisés</h4>
        <div className="grid grid-cols-4 gap-4">
          {goalDetails.kpis.map((kpi) => (
            <Card key={kpi.id} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white/60 text-sm">{kpi.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800 border-white/10">
                      <DropdownMenuItem
                        onClick={() => setSelectedMetric(kpi.id)}
                      >
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteKPI?.(kpi.id)}>
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">
                    {kpi.type === "currency" && "€"}
                    {kpi.value.toLocaleString()}
                    {kpi.type === "percentage" && "%"}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/40">
                      Objectif: {kpi.target.toLocaleString()}
                      {kpi.type === "percentage" && "%"}
                    </div>
                    {kpi.trend && (
                      <div
                        className={`text-sm px-2 py-1 rounded-full ${
                          kpi.trend.isPositive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {kpi.trend.direction === "up" ? "↑" : "↓"}{" "}
                        {Math.abs(kpi.trend.value)}%
                      </div>
                    )}
                  </div>
                </div>

                {kpi.history && (
                  <div className="mt-4 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={kpi.history}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={kpi.color || "#60A5FA"}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={showKPIDialog} onOpenChange={setShowKPIDialog}>
        <DialogContent className="bg-slate-800 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">
              Ajouter un nouveau KPI
            </DialogTitle>
          </DialogHeader>
          {/* Formulaire d'ajout de KPI */}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedMetric}
        onOpenChange={() => setSelectedMetric(null)}
      >
        <DialogContent className="bg-slate-800 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Détails du KPI</DialogTitle>
          </DialogHeader>
          {/* Détails et graphiques du KPI sélectionné */}
        </DialogContent>
      </Dialog>
    </div>
  );
};
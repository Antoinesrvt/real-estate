import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, LinkIcon, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoalDetails, TypeStyles } from '../../../types';

interface OverviewProps {
  goalDetails: GoalDetails;
  styles: TypeStyles;
}

const Overview: React.FC<OverviewProps> = ({ goalDetails, styles }) => {
  if (!goalDetails) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Les détails du projet ne sont pas disponibles.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Informations générales */}
      <Card className="col-span-2 bg-white/5 border-white/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Description
          </h3>
          <p className="text-white/80 mb-6">
            {goalDetails.description}
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-white/60 mb-2">Équipe</h4>
              <div className="flex -space-x-2">
                {goalDetails.assignees?.map((user) => (
                  <img
                    key={user.id}
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-slate-900"
                    title={user.name}
                  />
                )) || <span className="text-white/60">Aucun membre assigné</span>}
                <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Plus className="h-4 w-4 text-white/60" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-white/60 mb-2">Priorité</h4>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${styles.background} ${styles.text}`}
              >
                <AlertCircle className="h-4 w-4" />
                {goalDetails.priority}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Métriques
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/60">Temps passé</span>
                <span className="text-white">
                  {goalDetails.metrics?.time.timeSpent}h
                </span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/60">Budget utilisé</span>
                <span className="text-white">
                  {Math.round(
                    (goalDetails.metrics.budget.spent /
                      goalDetails.metrics.budget.allocated) *
                      100
                  )}
                  %
                </span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-white/60 mb-2">Risques identifiés</h4>
            <div className="space-y-2">
              {goalDetails.metrics?.risks.risks.map((risk, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded bg-white/5"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      risk.severity === "high"
                        ? "bg-red-400"
                        : risk.severity === "medium"
                        ? "bg-yellow-400"
                        : "bg-blue-400"
                    }`}
                  />
                  <span className="text-white/80">{risk.title}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tâches */}
      <Card className="col-span-2 bg-white/5 border-white/10">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              Tâches en cours
            </h3>
            <button className="text-sm text-white/60 hover:text-white">
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {goalDetails.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="cursor-pointer">
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                    )}
                  </div>
                  <span
                    className={
                      task.status === "completed"
                        ? "text-white/40 line-through"
                        : "text-white"
                    }
                  >
                    {task.title}
                  </span>
                  {task.alert && (
                    <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                      {task.alert}
                    </span>
                  )}
                </div>
                <span className="text-sm text-white/40">
                  {task.deadline}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dépendances */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Dépendances
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-white/60 text-sm mb-2">Bloqué par</h4>
              <div className="space-y-2">
                {goalDetails.dependencies.blockedBy.map((dep) => (
                  <div
                    key={dep.id}
                    className="flex items-center gap-2 text-sm p-2 rounded bg-white/5"
                  >
                    <LinkIcon className="h-4 w-4 text-white/40" />
                    <span className="text-white/80">{dep.title}</span>
                    <span
                      className={`ml-auto text-xs px-2 py-1 rounded-full ${
                        dep.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : dep.status === "in_progress"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {dep.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white/60 text-sm mb-2">Bloque</h4>
              <div className="space-y-2">
                {goalDetails.dependencies.blocking.map((dep) => (
                  <div
                    key={dep.id}
                    className="flex items-center gap-2 text-sm p-2 rounded bg-white/5"
                  >
                    <LinkIcon className="h-4 w-4 text-white/40" />
                    <span className="text-white/80">{dep.title}</span>
                    <span className="ml-auto text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                      {dep.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;

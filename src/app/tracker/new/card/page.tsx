"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Link as LinkIcon, 
  MessageSquare, 
  Plus, 
  Target,
  Users,
  XCircle,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import Timeline from "./tabs/Timeline";
import Overview from './tabs/Overview';
import Ressources from './tabs/Ressources';
import { Goal, GoalDetails, TypeStyles } from '../types';
import { mockGoal, typeStyles } from '../mockData';
import Updates from "./tabs/Updates";

const goal: Goal = mockGoal;

const GoalDetailView = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const goalDetails = mockGoal.details as GoalDetails;

  // Style selon le type de projet (même logique que précédemment)
  const styles = typeStyles[goal.type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="w-[90vw] h-[90vh] bg-slate-900/95 rounded-xl backdrop-blur-xl border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 border-b border-white/10 ${styles.background}`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`text-sm px-3 py-1 rounded-full ${styles.background} ${styles.text}`}
                >
                  {goal.type}
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="h-4 w-4" />
                  <span>Échéance: {goalDetails.deadline}</span>
                </div>
              </div>
              <h2 className={`text-2xl font-bold ${styles.text} mb-1`}>
                {goal.title}
              </h2>
              <p className="text-white/60">{goal.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white/60 text-sm mb-1">Progression</div>
                <div className={`text-2xl font-bold ${styles.text}`}>
                  {goal.progress}%
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <XCircle className="h-6 w-6 text-white/60" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-white/10">
          {["overview", "tasks", "timeline", "metrics", "updates", "ressources"].map(
            (tab) => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-medium transition-colors
                ${
                  activeTab === tab
                    ? `${styles.text} border-b-2 ${styles.border}`
                    : "text-white/60 hover:text-white/90"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Content */}
        <div className="p-6 h-[calc(90vh-200px)] overflow-y-auto">
          {activeTab === "overview" && <Overview goalDetails={goalDetails} styles={styles} />}

          {activeTab === "updates" && <Updates goalDetails={goalDetails} selectedObject={undefined} styles={styles} />}
          
          {activeTab === "tasks" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  Liste des tâches
                </h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm">
                    Filtrer
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg transition-colors text-sm ${styles.background} ${styles.text}`}
                  >
                    Nouvelle tâche
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Colonnes Kanban */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-lg">
                    <h4 className="text-white/60 font-medium">À faire</h4>
                    <span className="text-sm px-2 py-1 rounded-full bg-white/10 text-white/60">
                      3
                    </span>
                  </div>
                  <div className="space-y-3">
                    {goalDetails.tasks
                      .filter((task) => !task.completed)
                      .map((task) => (
                        <Card
                          key={task.id}
                          className="bg-white/5 border-white/10"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-5 h-5 rounded-full border-2 border-white/20 cursor-pointer" />
                              <span className="text-white">{task.title}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-white/40">
                                {task.deadline}
                              </span>
                              {task.alert && (
                                <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                                  {task.alert}
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-lg">
                    <h4 className="text-white/60 font-medium">En cours</h4>
                    <span className="text-sm px-2 py-1 rounded-full bg-white/10 text-white/60">
                      2
                    </span>
                  </div>
                  <div className="space-y-3">{/* Tâches en cours */}</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-lg">
                    <h4 className="text-white/60 font-medium">Terminé</h4>
                    <span className="text-sm px-2 py-1 rounded-full bg-white/10 text-white/60">
                      4
                    </span>
                  </div>
                  <div className="space-y-3">
                    {goalDetails.tasks
                      .filter((task) => task.completed)
                      .map((task) => (
                        <Card
                          key={task.id}
                          className="bg-white/5 border-white/10"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <CheckCircle2 className="h-5 w-5 text-green-400" />
                              <span className="text-white/40 line-through">
                                {task.title}
                              </span>
                            </div>
                            <span className="text-sm text-white/40">
                              {task.deadline}
                            </span>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <Timeline goalDetails={goalDetails} onFilterTasks={() => {}} styles={styles} />
          )}

          {activeTab === "metrics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-white/60">Temps</h4>
                      <Clock className="h-5 w-5 text-white/40" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">
                      {goalDetails.metrics.timeSpent}h
                    </div>
                    <div className="text-sm text-white/40">
                      sur{" "}
                      {goalDetails.metrics.timeSpent +
                        goalDetails.metrics.estimatedTimeLeft}
                      h estimées
                    </div>
                    <Progress
                      value={
                        (goalDetails.metrics.timeSpent /
                          (goalDetails.metrics.timeSpent +
                            goalDetails.metrics.estimatedTimeLeft)) *
                        100
                      }
                      className="h-2 mt-4"
                    />
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-white/60">Budget</h4>
                      <BarChart3 className="h-5 w-5 text-white/40" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">
                      {goalDetails.metrics.budget.spent.toLocaleString()}€
                    </div>
                    <div className="text-sm text-white/40">
                      sur{" "}
                      {goalDetails.metrics.budget.allocated.toLocaleString()}€
                      alloués
                    </div>
                    <Progress
                      value={
                        (goalDetails.metrics.budget.spent /
                          goalDetails.metrics.budget.allocated) *
                        100
                      }
                      className="h-2 mt-4"
                    />
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-white/60">Objectifs</h4>
                      <Target className="h-5 w-5 text-white/40" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">
                      {goalDetails.tasks.filter((t) => t.completed).length}
                    </div>
                    <div className="text-sm text-white/40">
                      tâches terminées sur {goalDetails.tasks.length}
                    </div>
                    <Progress
                      value={
                        (goalDetails.tasks.filter((t) => t.completed).length /
                          goalDetails.tasks.length) *
                        100
                      }
                      className="h-2 mt-4"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Autres métriques et graphiques pourraient être ajoutés ici */}
            </div>
          )}
          {activeTab === "ressources" && (
            <Ressources goalDetails={goalDetails} styles={styles} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GoalDetailView;
                        
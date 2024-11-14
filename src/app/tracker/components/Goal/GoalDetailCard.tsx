"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
import Overview from "./tabs/Overview";
import Ressources from "./tabs/Ressources";
import { Goal, GoalDetails, TypeStyles } from "@/app/tracker/types";
import { mockGoal, typeStyles } from "@/app/tracker/new/mockData";
import Updates from "./tabs/Updates";
import { useGoal } from "@/app/tracker/contexts/GoalContext";
import Metrics from "./tabs/Metrics";
import Tasks from "./tabs/Tasks";

const goal: Goal = mockGoal;

const GoalDetailView = () => {
  const { selectedGoal, isCardOpen, closeGoalCard } = useGoal();
  const [activeTab, setActiveTab] = useState("overview");

  const goalDetails = mockGoal.details as GoalDetails;

  // Style selon le type de projet (même logique que précédemment)
  const styles = typeStyles[goal.type];

  if (!isCardOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-12"
      onClick={closeGoalCard}
    >
      <motion.div
        className="w-full h-full z-50 bg-slate-900/95 rounded-xl backdrop-blur-xl border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        }}
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
                onClick={closeGoalCard}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <XCircle className="h-6 w-6 text-white/60" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-white/10">
          {[
            "overview",
            "tasks",
            "timeline",
            "metrics",
            "updates",
            "ressources",
          ].map((tab) => (
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
          ))}
        </div>

        {/* Content */}
        <div className="p-6 h-[calc(90vh-200px)] overflow-y-auto">
          {activeTab === "overview" && (
            <Overview goalDetails={goalDetails} styles={styles} />
          )}

          {activeTab === "updates" && (
            <Updates
              goalDetails={goalDetails}
              selectedObject={undefined}
              styles={styles}
            />
          )}

          {activeTab === "tasks" && (
            <Tasks goalDetails={goalDetails} styles={styles} />
          )}

          {activeTab === "timeline" && (
            <Timeline
              goalDetails={goalDetails}
              onFilterTasks={() => {}}
              styles={styles}
            />
          )}

          {activeTab === "metrics" && (
            <Metrics goalDetails={goalDetails} styles={styles} />
          )}
          {activeTab === "ressources" && (
            <Ressources goalDetails={goalDetails} styles={styles} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GoalDetailView;

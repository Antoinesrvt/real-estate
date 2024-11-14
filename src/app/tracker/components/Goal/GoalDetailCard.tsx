"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGoal } from "@/app/tracker/contexts/GoalContext";
import { GoalHeader } from "./components/GoalHeader";
import { GoalNavigation, TabType } from "./components/GoalNavigation";
import { GoalContent } from "./components/GoalContent";
import { typeStyles } from "@/app/tracker/new/mockData";
import { mockGoalDetails } from "@/app/tracker/new/mockedDetails";
import { GoalDetails } from "@/app/tracker/types/goals";

const GoalDetailCard = () => {
  const { selectedGoal, isCardOpen, goalDetails, closeGoalCard } = useGoal();
  const [activeTab, setActiveTab] = useState<TabType>("overview");


  if (!isCardOpen || !selectedGoal) return null;

  const styles = typeStyles[selectedGoal.type];

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
        <GoalHeader
          goal={selectedGoal}
          goalDetails={mockGoalDetails as unknown as GoalDetails}
          styles={styles}
          onClose={closeGoalCard}
        />

        <GoalNavigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as TabType)}
          styles={styles}
        />

        <GoalContent
          activeTab={activeTab}
          goalDetails={mockGoalDetails as unknown as GoalDetails}
          styles={styles}
        />
      </motion.div>
    </div>
  );
};

export default GoalDetailCard;
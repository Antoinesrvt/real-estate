"use client";

import React, { createContext, useContext, useState } from 'react';
import { Goal } from '../types';

interface GoalContextType {
  selectedGoal: Goal | null;
  isCardOpen: boolean;
  openGoalCard: (goal: Goal) => void;
  closeGoalCard: () => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export function GoalProvider({ children }: { children: React.ReactNode }) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const openGoalCard = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsCardOpen(true);
  };

  const closeGoalCard = () => {
    setIsCardOpen(false);
    setSelectedGoal(null);
  };

  return (
    <GoalContext.Provider value={{ selectedGoal, isCardOpen, openGoalCard, closeGoalCard }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoal() {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoal must be used within a GoalProvider');
  }
  return context;
} 
"use client";

import React, { createContext, useContext, useState } from 'react';
import { Goal, GoalDetails } from '../types/goals';

interface GoalContextType {
  // Current goal state
  selectedGoal: Goal | null;
  goalDetails: GoalDetails | null;
  setSelectedGoal: (goal: Goal | null) => void;
  setGoalDetails: (details: GoalDetails | null) => void;
  
  // Card UI state
  isCardOpen: boolean;
  openGoalCard: (goal: Goal) => void;
  closeGoalCard: () => void;
  
  // Additional shared state and actions
  updateGoalProgress?: (goalId: number, progress: number) => void;
  updateGoalDetails?: (goalId: number, details: Partial<GoalDetails>) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export function GoalProvider({ children }: { children: React.ReactNode }) {
  // Goal state
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [goalDetails, setGoalDetails] = useState<GoalDetails | null>(null);
  
  // Card UI state
  const [isCardOpen, setIsCardOpen] = useState(false);

  const openGoalCard = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsCardOpen(true);
    // You might want to fetch goal details here
    // fetchGoalDetails(goal.id).then(setGoalDetails);
  };

  const closeGoalCard = () => {
    setIsCardOpen(false);
    setSelectedGoal(null);
    setGoalDetails(null);
  };

  // Optional: Add methods to update goal data
  const updateGoalProgress = (goalId: number, progress: number) => {
    setSelectedGoal(prev => {
      if (prev && prev.id === goalId) {
        return { ...prev, progress };
      }
      return prev;
    });
  };

  const updateGoalDetails = (goalId: number, details: Partial<GoalDetails>) => {
    setGoalDetails(prev => {
      if (prev) {
        return { ...prev, ...details };
      }
      return prev;
    });
  };

  return (
    <GoalContext.Provider 
      value={{
        // Goal state
        selectedGoal,
        goalDetails,
        setSelectedGoal,
        setGoalDetails,
        
        // Card UI state
        isCardOpen,
        openGoalCard,
        closeGoalCard,
        
        // Optional update methods
        updateGoalProgress,
        updateGoalDetails,
      }}
    >
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

// Optional: Add custom hooks for specific functionality
export function useGoalCard() {
  const { isCardOpen, openGoalCard, closeGoalCard } = useGoal();
  return { isCardOpen, openGoalCard, closeGoalCard };
}

export function useGoalDetails() {
  const { selectedGoal, goalDetails, updateGoalDetails } = useGoal();
  return { selectedGoal, goalDetails, updateGoalDetails };
} 
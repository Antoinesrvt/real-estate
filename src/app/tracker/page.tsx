"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ArrowRight, ZoomIn, ZoomOut, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Add interfaces for type definitions
interface Goal {
  id: string;
  title: string;
  type: 'personnel' | 'travail' | 'experience';
  progress: number;
  level: number;
  row: number;
}

interface ScrollPosition {
  x: number;
  y: number;
}

interface TypeStyles {
  background: string;
  border: string;
  text: string;
  shadow: string;
  glow: string;
}

interface PatternBackgroundProps {
  type: Goal['type'];
}

interface CurvedConnectionProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

// ... previous imports and interfaces ...

const Goals: Goal[] = [
    {
      id: "1",
      title: "Apprendre TypeScript",
      type: "travail",
      progress: 75,
      level: 0,
      row: 0,
    },
    {
      id: "2",
      title: "Méditer 10min/jour",
      type: "personnel",
      progress: 100,
      level: 0,
      row: 1,
    },
    {
      id: "3",
      title: "Maîtriser React",
      type: "travail",
      progress: 60,
      level: 1,
      row: 0,
    },
    {
      id: "4",
      title: "Voyage au Japon",
      type: "experience",
      progress: 30,
      level: 1,
      row: 1,
    },
    {
      id: "5",
      title: "Lire 12 livres",
      type: "personnel",
      progress: 50,
      level: 2,
      row: 0,
    },
    {
      id: "6",
      title: "Certification AWS",
      type: "travail",
      progress: 25,
      level: 2,
      row: 1,
    },
    {
      id: "7",
      title: "Marathon",
      type: "experience",
      progress: 15,
      level: 3,
      row: 0,
    },
    {
      id: "8",
      title: "Side Project",
      type: "travail",
      progress: 40,
      level: 3,
      row: 1,
  },
];

const GoalTracker: React.FC = () => {
  const [goals] = useState<Goal[]>(Goals);
  const [zoom, setZoom] = useState<number>(1);
  const [showMinimap, setShowMinimap] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  // Update event handler with type
  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    if (containerRef.current) {
      setScrollPosition({
        x: containerRef.current.scrollLeft,
        y: containerRef.current.scrollTop,
      });
    }
  };

  // Add types to components
  const PatternBackground: React.FC<PatternBackgroundProps> = ({ type }) => (
    <svg
      className="absolute inset-0 w-full h-full opacity-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id={`pattern-${type}`}
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="10" cy="10" r="1" fill="currentColor" />
      </pattern>
      <rect width="100%" height="100%" fill={`url(#pattern-${type})`} />
    </svg>
  );

  const CurvedConnection: React.FC<CurvedConnectionProps> = ({ startX, startY, endX, endY }) => (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <path
        d={`M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${
          (startX + endX) / 2
        } ${endY}, ${endX} ${endY}`}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,5"
        className="text-white/20"
      />
    </svg>
  );

  const typeStyles: Record<Goal['type'], TypeStyles> = {
    personnel: {
      background: "bg-purple-500/10",
      border: "border-purple-400/20",
      text: "text-purple-100",
      shadow: "shadow-purple-500/20",
      glow: "after:bg-purple-500/5",
    },
    travail: {
      background: "bg-blue-500/10",
      border: "border-blue-400/20",
      text: "text-blue-100",
      shadow: "shadow-blue-500/20",
      glow: "after:bg-blue-500/5",
    },
    experience: {
      background: "bg-green-500/10",
      border: "border-green-400/20",
      text: "text-green-100",
      shadow: "shadow-green-500/20",
      glow: "after:bg-green-500/5",
    },
  };

  const renderGoalCard = (goal: Goal): JSX.Element => {
    const styles = typeStyles[goal.type];

    return (
      <motion.div
        key={goal.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        <div
          className={`
          absolute -inset-2 rounded-xl blur-xl opacity-0 group-hover:opacity-100
          transition-opacity duration-300 ${styles.glow} z-0
        `}
        />

        <Card
          className={`
          relative w-64 h-36 backdrop-blur-xl
          ${styles.background} ${styles.border} border
          hover:border-opacity-50 rounded-xl
          transition-all duration-300 ease-in-out
          hover:shadow-lg hover:shadow-black/20 ${styles.shadow}
          transform hover:-translate-y-1 hover:scale-105
          before:absolute before:inset-0 before:rounded-xl
          before:backdrop-blur-xl before:backdrop-saturate-150
          overflow-hidden z-10
        `}
        >
          <PatternBackground type={goal.type} />

          <div
            className={`
            absolute bottom-0 left-0 h-1 rounded-b-xl
            transition-all duration-300 ease-out
            ${
              goal.type === "personnel"
                ? "bg-purple-400/50"
                : goal.type === "travail"
                ? "bg-blue-400/50"
                : "bg-green-400/50"
            }
          `}
            style={{ width: `${goal.progress}%` }}
          />

          <CardContent className="p-4 h-full flex flex-col justify-between relative z-20">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs opacity-70 mb-1 ${styles.text}`}
              >
                {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)}
              </motion.div>
              <motion.div
                className={`font-semibold ${styles.text} text-lg`}
                layoutId={`title-${goal.id}`}
              >
                {goal.title}
              </motion.div>
            </div>

            <div className="flex justify-between items-center">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div
                  className={`
                  h-2 w-2 rounded-full transition-colors duration-300
                  ${goal.progress >= 100 ? "bg-green-400" : "bg-white/30"}
                `}
                />
                <span className="text-white/80 text-sm">{goal.progress}%</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <Plus className="h-4 w-4 text-white/60 hover:text-white/90" />
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderColumn = (level: number): JSX.Element => {
    const levelGoals = goals.filter((g) => g.level === level);
    const rows = Math.max(...levelGoals.map((g) => g.row)) + 1;

    return (
      <motion.div
        className="flex flex-col gap-6"
        style={{ scale: zoom }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {[...Array(rows)].map((_, rowIndex) => {
          const goalInRow = levelGoals.find((g) => g.row === rowIndex);
          return (
            <div
              key={`${level}-${rowIndex}`}
              className="h-36 relative"
              style={{ opacity: goalInRow ? 1 : 0.2 }}
            >
              {goalInRow && renderGoalCard(goalInRow)}
            </div>
          );
        })}
      </motion.div>
    );
  };

  // Composant Minimap
  const Minimap: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-4 right-4 bg-black/50 backdrop-blur-md
                 rounded-lg p-4 border border-white/10"
    >
      <div className="text-xs text-white/60 mb-2">Vue d'ensemble</div>
      <div className="w-48 h-32 relative">
        {/* Représentation miniature des colonnes */}
        <div className="flex gap-2 h-full">
          {[0, 1, 2, 3].map((level) => (
            <div key={level} className="flex-1 bg-white/5 rounded" />
          ))}
        </div>
        {/* Indicateur de position visible */}
        <div
          className="absolute bg-white/20 rounded"
          style={{
            left: `${
              (scrollPosition.x / (containerRef.current?.scrollWidth || 0)) * 100
            }%`,
            top: `${
              (scrollPosition.y / (containerRef.current?.scrollHeight || 0)) * 100
            }%`,
            width: "25%",
            height: "25%",
          }}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]
                      from-slate-900 via-slate-800 to-slate-900"
      />

      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              Vision & Objectifs
            </motion.h1>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-white/10"
                onClick={() => setZoom((z) => Math.min(z + 0.1, 1.5))}
              >
                <ZoomIn className="h-5 w-5 text-white/60" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-white/10"
                onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
              >
                <ZoomOut className="h-5 w-5 text-white/60" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-white/10"
                onClick={() => setShowMinimap((s) => !s)}
              >
                <Map className="h-5 w-5 text-white/60" />
              </motion.button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="overflow-auto pb-8 max-h-[calc(100vh-12rem)]"
            onScroll={handleScroll}
          >
            <div className="flex gap-24 min-w-max p-4">
              {[0, 1, 2, 3].map((level) => (
                <div key={level} className="flex flex-col gap-6">
                  <motion.div
                    className="text-sm text-white/50 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: level * 0.1 }}
                  >
                    Niveau {level + 1}
                  </motion.div>
                  {renderColumn(level)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>{showMinimap && <Minimap />}</AnimatePresence>
    </div>
  );
};

export default GoalTracker;

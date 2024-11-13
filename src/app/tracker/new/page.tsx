"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ZoomIn, ZoomOut, Home } from "lucide-react";
import { motion } from "framer-motion";
import { GoalCard } from "./Card";
import { goalsData } from "./type";

export interface Goal {
  id: number;
  title: string;
  type: "fondation" | "action" | "strategie" | "vision";
  level: number;
  progress: number;
  connections: number[];
  description?: string;
  position?: { x: number; y: number };
}

// Configuration de la grille avec des espacements optimisés
const CARD_WIDTH = 264;
const CARD_HEIGHT = 36;
const HORIZONTAL_GAP = 70;  // Espacement entre les types (horizontal)
const VERTICAL_GAP = 50;    // Espacement entre les goals (vertical)

// Ordre des types de gauche à droite
const SECTION_TYPES = ["fondation", "action", "strategie", "vision"];

const TYPE_LABELS = {
  fondation: "Fondations",
  action: "Actions",
  strategie: "Stratégies",
  vision: "Vision Stratégique",
};

const GoalTracker = () => {
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Mise à jour du calcul des positions
  const calculatePositions = (goals: Goal[]) => {
    // Grouper les goals par type
    const goalsByType = SECTION_TYPES.reduce((acc, type) => {
      acc[type] = goals.filter(goal => goal.type === type);
      return acc;
    }, {} as Record<string, Goal[]>);

    return goals.map(goal => {
      const typeIndex = SECTION_TYPES.indexOf(goal.type);
      const goalsOfSameType = goalsByType[goal.type];
      const goalIndexInType = goalsOfSameType.findIndex(g => g.id === goal.id);

      return {
        ...goal,
        position: {
          x: typeIndex * (CARD_WIDTH + HORIZONTAL_GAP),
          y: goalIndexInType * (CARD_HEIGHT * 3 + VERTICAL_GAP)
        }
      };
    });
  };

  // Initialiser les goals avec les positions calculées
  const [goals] = useState(() => calculatePositions(goalsData));

  const typeStyles = {
    fondation: {
      background: "bg-purple-500/10",
      border: "border-purple-400/20",
      text: "text-purple-100",
      shadow: "shadow-purple-500/20",
      glow: "after:bg-purple-500/5",
      connection: "stroke-purple-400/30",
    },
    action: {
      background: "bg-blue-500/10",
      border: "border-blue-400/20",
      text: "text-blue-100",
      shadow: "shadow-blue-500/20",
      glow: "after:bg-blue-500/5",
      connection: "stroke-blue-400/30",
    },
    strategie: {
      background: "bg-emerald-500/10",
      border: "border-emerald-400/20",
      text: "text-emerald-100",
      shadow: "shadow-emerald-500/20",
      glow: "after:bg-emerald-500/5",
      connection: "stroke-emerald-400/30",
    },
    vision: {
      background: "bg-amber-500/10",
      border: "border-amber-400/20",
      text: "text-amber-100",
      shadow: "shadow-amber-500/20",
      glow: "after:bg-amber-500/5",
      connection: "stroke-amber-400/30",
    },
  };

  // Gestion du zoom et du pan
  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setTransform((t) => ({
        ...t,
        scale: Math.min(Math.max(t.scale * delta, 0.2), 2),
      }));
    } else {
      setTransform((t) => ({
        ...t,
        x: t.x - e.deltaX,
        y: t.y - e.deltaY,
      }));
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === 1 || e.button === 0) {
      setIsDragging(true);
      setStartPos({
        x: e.clientX - transform.x,
        y: e.clientY - transform.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setTransform((t) => ({
        ...t,
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderConnections = () => {
    return goals.map((goal) => {
      return goal.connections.map((targetId) => {
        const target = goals.find((g) => g.id === targetId);
        if (!target) return null;

        const start = goal.position;
        const end = target.position;

        // Points de contrôle pour une courbe plus naturelle
        const midX = (start.x + end.x) / 2;

        return (
          <path
            key={`${goal.id}-${targetId}`}
            d={`M ${start.x + CARD_WIDTH} ${start.y + CARD_HEIGHT/2} 
                C ${midX} ${start.y + CARD_HEIGHT/2},
                  ${midX} ${end.y + CARD_HEIGHT/2},
                  ${end.x} ${end.y + CARD_HEIGHT/2}`}
            className={`${typeStyles[goal.type].connection} fill-none stroke-2`}
            strokeDasharray="5,5"
            style={{ opacity: 0.6 }}
          />
        );
      });
    });
  };

  const renderGoalCard = (goal) => {
    return (
      <GoalCard
        key={goal.id}
        id={goal.id}
        title={goal.title}
        type={goal.type}
        progress={goal.progress}
        description={goal.description}
        position={goal.position}
      />
    );
  };

  const renderSectionLabels = () => {
    return SECTION_TYPES.map((type, index) => (
      <React.Fragment key={type}>
        {/* Section Label */}
        <div
          className="absolute flex flex-col items-center gap-2"
          style={{
            left: index * (CARD_WIDTH + HORIZONTAL_GAP) + CARD_WIDTH/2,
            top: -40,
            transform: 'translateX(-50%)'
          }}
        >
          <h2 className="text-white/70 font-medium text-sm tracking-wider uppercase">
            {TYPE_LABELS[type]}
          </h2>
          <div className="h-[20px] w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </div>
        
        {/* Vertical Separator */}
        {index < SECTION_TYPES.length - 1 && (
          <div
            className="absolute top-0 bottom-0 border-r border-dashed border-white/10"
            style={{
              left: (index + 1) * (CARD_WIDTH + HORIZONTAL_GAP) - HORIZONTAL_GAP/2,
            }}
          />
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="fixed top-4 left-4 z-20 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20"
          onClick={() => setTransform({ scale: 1, x: 0, y: 0 })}
        >
          <Home className="h-5 w-5 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20"
          onClick={() => setTransform((t) => ({ ...t, scale: t.scale * 1.2 }))}
        >
          <ZoomIn className="h-5 w-5 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20"
          onClick={() => setTransform((t) => ({ ...t, scale: t.scale * 0.8 }))}
        >
          <ZoomOut className="h-5 w-5 text-white" />
        </motion.button>
      </div>

      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: "0 0",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        >
          {renderSectionLabels()}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {renderConnections()}
          </svg>
          {goals.map(renderGoalCard)}
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;

"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ZoomIn, ZoomOut, Home } from "lucide-react";
import { motion } from "framer-motion";

const goalsData = [
  {
    id: 1,
    title: "Site E-commerce",
    type: "fondation",
    progress: 90,
    position: { x: 100, y: 100 },
    connections: [5],
    description: "Développement Frontend",
  },
  {
    id: 2,
    title: "Base de données",
    type: "fondation",
    progress: 75,
    position: { x: 100, y: 300 },
    connections: [5],
    description: "Architecture Backend",
  },
  {
    id: 5,
    title: "MVP Application",
    type: "action",
    progress: 60,
    position: { x: 500, y: 200 },
    connections: [8],
    description: "Version Beta",
  },
  {
    id: 8,
    title: "Startup Tech",
    type: "strategie",
    progress: 45,
    position: { x: 900, y: 200 },
    connections: [10],
    description: "Lancement Entreprise",
  },
  {
    id: 10,
    title: "Liberté Financière",
    type: "vision",
    progress: 30,
    position: { x: 1300, y: 200 },
    connections: [],
    description: "Objectif Final",
  },
];

const GoalTracker = () => {
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const [goals] = useState(goalsData);

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

        // Points de contrôle pour une courbe horizontale élégante
        const midX = (start.x + end.x) / 2;

        return (
          <path
            key={`${goal.id}-${targetId}`}
            d={`M ${start.x + 264} ${start.y + 36} 
                C ${midX} ${start.y + 36},
                  ${midX} ${end.y + 36},
                  ${end.x} ${end.y + 36}`}
            className={`${typeStyles[goal.type].connection} fill-none stroke-2`}
            strokeDasharray="5,5"
            style={{ opacity: 0.6 }}
          />
        );
      });
    });
  };

  const renderGoalCard = (goal) => {
    const styles = typeStyles[goal.type];

    return (
      <motion.div
        key={goal.id}
        className="absolute"
        style={{
          left: goal.position.x,
          top: goal.position.y,
        }}
      >
        <Card
          className={`
          relative w-64 h-36 backdrop-blur-xl
          ${styles.background} ${styles.border} border
          hover:border-opacity-50 rounded-xl
          transition-all duration-300 ease-in-out
          hover:shadow-lg hover:shadow-black/20 ${styles.shadow}
          transform hover:-translate-y-1 hover:scale-105 group
          cursor-pointer
        `}
        >
          <div
            className={`absolute bottom-0 left-0 h-1 rounded-b-xl transition-all duration-300
              ${
                goal.type === "fondation"
                  ? "bg-purple-400/50"
                  : goal.type === "action"
                  ? "bg-blue-400/50"
                  : goal.type === "strategie"
                  ? "bg-emerald-400/50"
                  : "bg-amber-400/50"
              }`}
            style={{ width: `${goal.progress}%` }}
          />

          <CardContent className="p-4 h-full flex flex-col justify-between relative z-10">
            <div>
              <div className={`text-xs opacity-70 mb-1 ${styles.text}`}>
                {goal.description}
              </div>
              <div className={`font-semibold ${styles.text} text-lg`}>
                {goal.title}
              </div>
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

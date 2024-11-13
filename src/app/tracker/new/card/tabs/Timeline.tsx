import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar as CalendarIcon,
  Plus,
  Check,
  Clock,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type Milestone = {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description?: string;
  dependencies?: string[];
  tasksCount?: number;
  completedTasksCount?: number;
  assignees?: { id: string; name: string; avatar: string }[];
  priority?: 'low' | 'medium' | 'high';
};

type NewMilestone = Pick<Milestone, 'title' | 'date'> & {
  description?: string;
  priority?: Milestone['priority'];
};

interface TimelineTabProps {
  goalDetails: {
    progress: number;
    milestones: Milestone[];
  };
  styles?: {
    background?: string;
    text?: string;
  };
  onFilterTasks: (milestone: Milestone) => void;
  onAddMilestone?: (milestone: NewMilestone) => void;
  onUpdateMilestone?: (milestone: Milestone) => void;
  onDeleteMilestone?: (milestoneId: string) => void;
  onToggleMilestoneComplete?: (milestoneId: string) => void;
}

interface ContextMenu {
  show: boolean;
  x: number;
  y: number;
  milestone: Milestone | null;
}

const TimelineTab: React.FC<TimelineTabProps> = ({
  goalDetails,
  styles,
  onFilterTasks,
  onAddMilestone,
  onUpdateMilestone,
  onDeleteMilestone,
  onToggleMilestoneComplete,
}) => {
  const [showAddMilestone, setShowAddMilestone] = useState<boolean>(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(
    null
  );
  const [contextMenu, setContextMenu] = useState<ContextMenu>({
    show: false,
    x: 0,
    y: 0,
    milestone: null,
  });

  const [newMilestone, setNewMilestone] = useState<NewMilestone>({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
    priority: "medium",
  });

  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.show) {
        setContextMenu({ show: false, x: 0, y: 0, milestone: null });
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [contextMenu.show]);

  const getMilestoneStatus = (milestone: Milestone) => {
    if (milestone.completed) {
      return {
        text: "Complété",
        className: "bg-green-500/20 text-green-400",
      };
    }
    if (new Date(milestone.date) < new Date()) {
      return {
        text: "En retard",
        className: "bg-red-500/20 text-red-400",
      };
    }
    if (milestone.tasksCount === milestone.completedTasksCount) {
      return {
        text: "Prêt",
        className: "bg-blue-500/20 text-blue-400",
      };
    }
    return {
      text: "En cours",
      className: "bg-white/10 text-white/60",
    };
  };

  const handleContextMenu = (
    e: React.MouseEvent,
    milestone: Milestone
  ): void => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      milestone,
    });
  };

  const handleMilestoneClick = (milestone: Milestone): void => {
    onFilterTasks(milestone);
  };

  const handleEditMilestone = (milestone: Milestone): void => {
    setEditingMilestone(milestone);
    setContextMenu({ show: false, x: 0, y: 0, milestone: null });
  };

  const handleAddMilestone = (): void => {
    if (!newMilestone.title || !newMilestone.date) return;
    onAddMilestone?.(newMilestone);
    setShowAddMilestone(false);
    setNewMilestone({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      description: "",
      priority: "medium",
    });
  };

  const handleUpdateMilestone = (): void => {
    if (!editingMilestone) return;
    onUpdateMilestone?.(editingMilestone);
    setEditingMilestone(null);
  };

  return (
    <div className="space-y-8">
      {/* Header avec bouton d'ajout */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Jalons du projet</h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-4 py-2 rounded-lg transition-colors ${styles?.background} ${styles?.text}
          flex items-center gap-2`}
          onClick={() => setShowAddMilestone(true)}
        >
          <Plus className="h-4 w-4" />
          Ajouter un jalon
        </motion.button>
      </div>

      {/* Timeline horizontale */}
      <div className="relative">
        {/* Ligne de progression */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-green-400/50 to-green-400/0"
          style={{ width: `${goalDetails.progress}%` }}
        />

        {/* Conteneur des jalons */}
        <div className="relative overflow-x-auto pb-4">
          <div className="relative flex gap-4 py-8 min-w-min">
            {goalDetails.milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                className="relative w-[300px] flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Ligne verticale de connexion */}
                <div className="absolute top-0 left-1/2 h-8 w-px bg-white/10 -translate-x-1/2" />

                {/* Point du jalon */}
                <motion.div
                  className={`relative z-10 w-6 h-6 mx-auto mb-4 rounded-full border-4 
                  cursor-pointer transition-transform hover:scale-110 group`}
                  style={{
                    backgroundColor: milestone.completed
                      ? "rgb(74 222 128)"
                      : "rgb(255 255 255 / 0.1)",
                    borderColor: "rgb(30 41 59)",
                  }}
                  onClick={() => onToggleMilestoneComplete?.(milestone.id)}
                  whileHover={{ scale: 1.2 }}
                >
                  {milestone.completed && (
                    <Check className="h-3 w-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded">
                      Cliquer pour marquer comme{" "}
                      {milestone.completed ? "incomplet" : "complet"}
                    </div>
                  </div>
                </motion.div>

                {/* Contenu du jalon */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg backdrop-blur-sm ${styles?.background} 
                  border border-white/10 cursor-pointer group/card`}
                  onClick={() => handleMilestoneClick(milestone)}
                  onContextMenu={(e) => handleContextMenu(e, milestone)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className={`text-sm px-2 py-1 rounded-full ${
                        getMilestoneStatus(milestone).className
                      }`}
                    >
                      {getMilestoneStatus(milestone).text}
                    </div>
                  </div>
                  <h4 className="font-medium text-white mb-2">
                    {milestone.title}
                  </h4>
                  <div className="flex items-center text-sm text-white/60">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {format(new Date(milestone.date), "d MMMM yyyy", {
                      locale: fr,
                    })}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu contextuel */}
      <AnimatePresence>
        {contextMenu.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-50 bg-slate-800 border border-white/10 rounded-lg shadow-xl p-2"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              className="w-full px-4 py-2 text-sm text-white hover:bg-white/10 rounded"
              onClick={() =>
                handleEditMilestone(contextMenu.milestone as Milestone)
              }
            >
              Modifier le jalon
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialog d'ajout de jalon */}
      <Dialog open={showAddMilestone} onOpenChange={setShowAddMilestone}>
        <DialogContent className="bg-slate-800 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">
              Ajouter un nouveau jalon
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-white/60">Titre du jalon</label>
              <Input
                placeholder="Ex: Lancement de la version beta"
                value={newMilestone.title}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, title: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/60">Date d'échéance</label>
              <Input
                type="date"
                value={newMilestone.date}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, date: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/60">Description</label>
              <Input
                placeholder="Description du jalon"
                value={newMilestone.description}
                onChange={(e) =>
                  setNewMilestone({
                    ...newMilestone,
                    description: e.target.value,
                  })
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/60">Priorité</label>
              <select
                value={newMilestone.priority}
                onChange={(e) =>
                  setNewMilestone({
                    ...newMilestone,
                    priority: e.target.value as "low" | "medium" | "high",
                  })
                }
                className="bg-white/5 border-white/10 text-white"
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddMilestone(false)}
              className="bg-white/5 hover:bg-white/10 text-white border-white/10"
            >
              Annuler
            </Button>
            <Button
              className={`${styles?.background} ${styles?.text}`}
              onClick={() => {
                // Logique d'ajout
                setShowAddMilestone(false);
              }}
            >
              Ajouter le jalon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de modification */}
      <Dialog
        open={!!editingMilestone}
        onOpenChange={() => setEditingMilestone(null)}
      >
        <DialogContent className="bg-slate-800 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Modifier le jalon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-white/60">Titre du jalon</label>
              <Input
                placeholder="Titre du jalon"
                value={editingMilestone?.title}
                onChange={(e) =>
                  setEditingMilestone({
                    ...editingMilestone,
                    title: e.target.value,
                  } as Milestone)
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/60">Date d'échéance</label>
              <Input
                type="date"
                value={editingMilestone?.date}
                onChange={(e) =>
                  setEditingMilestone({
                    ...editingMilestone,
                    date: e.target.value,
                  } as Milestone)
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/60">Description</label>
              <Input
                placeholder="Description du jalon"
                value={editingMilestone?.description}
                onChange={(e) =>
                  setEditingMilestone({
                    ...editingMilestone,
                    description: e.target.value,
                  } as Milestone)
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/60">Priorité</label>
              <select
                value={editingMilestone?.priority}
                onChange={(e) =>
                  setEditingMilestone({
                    ...editingMilestone,
                    priority: e.target.value as "low" | "medium" | "high",
                  } as Milestone)
                }
                className="bg-white/5 border-white/10 text-white"
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingMilestone(null)}
              className="bg-white/5 hover:bg-white/10 text-white border-white/10"
            >
              Annuler
            </Button>
            <Button
              className={`${styles?.background} ${styles?.text}`}
              onClick={() => {
                // Logique de modification
                setEditingMilestone(null);
              }}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimelineTab;

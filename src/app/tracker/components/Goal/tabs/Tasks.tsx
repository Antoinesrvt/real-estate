import React, { useMemo, useState } from 'react'
import { Goal, GoalDetails, Task, TypeStyles, User } from '@/app/tracker/types'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Plus, Filter, Columns } from 'lucide-react'
import { isWithinInterval } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor } from '@dnd-kit/core';
import { useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { TaskCard } from './tasks/TaskCard';
import { FiltersDialog, TaskDialog } from './tasks/Dialogs';
import Kanban from './tasks/vues/Kanban';
import CalendarView from './tasks/vues/Calendar';

// Types
interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskTemplate {
  id: string;
  title: string;
  description?: string;
  estimatedTime?: number;
  priority: 'low' | 'medium' | 'high';
  checklist: ChecklistItem[];
  category?: string;
}

interface TasksTabProps {
  goalDetails: GoalDetails & {
    taskTemplates: TaskTemplate[];
  };
  styles: TypeStyles;
  onUpdateTask?: (task: Task) => void;
  onCreateTask?: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDeleteTask?: (taskId: string) => void;
}

const TasksTab: React.FC<TasksTabProps> = ({
  goalDetails,
  styles,
  onUpdateTask,
  onCreateTask,
  onDeleteTask,
}) => {
  // États
  const [view, setView] = useState<'kanban' | 'calendar'>('kanban');
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    assignee: '',
    priority: '',
    category: '',
    dateRange: { from: '', to: '' },
    labels: [] as string[],
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TaskTemplate | null>(null);

  // DnD states


  // Filtrage des tâches
  const filteredTasks = useMemo(() => {
    return goalDetails.tasks.filter(task => {
      const matchesAssignee = !filters.assignee || 
        task.assignees?.some(a => a.id === filters.assignee);
      const matchesPriority = !filters.priority || 
        task.priority === filters.priority;
      const matchesCategory = !filters.category || 
        task.category === filters.category;
      const matchesDateRange = !filters.dateRange.from || !filters.dateRange.to || 
        (task.deadline && 
          isWithinInterval(new Date(task.deadline), {
            start: new Date(filters.dateRange.from),
            end: new Date(filters.dateRange.to),
          }));
      const matchesLabels = filters.labels.length === 0 || 
        filters.labels.every(label => task.labels?.includes(label));

      return matchesAssignee && matchesPriority && 
             matchesCategory && matchesDateRange && matchesLabels;
    });
  }, [goalDetails.tasks, filters]);

  // Groupement des tâches par statut
  const tasksByStatus = useMemo(() => {
    return {
      todo: filteredTasks.filter(t => t.status === 'todo'),
      in_progress: filteredTasks.filter(t => t.status === 'in_progress'),
      completed: filteredTasks.filter(t => t.status === 'completed'),
    };
  }, [filteredTasks]);



  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-white">Liste des tâches</h3>
          <div className="flex items-center bg-white/5 rounded-lg p-1">
            <button
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                view === 'kanban' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setView('kanban')}
            >
              <Columns className="h-4 w-4" />
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                view === 'calendar' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setView('calendar')}
            >
              <Calendar className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-white/5 hover:bg-white/10 text-white border-white/10"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button
            className={`${styles.background} ${styles.text}`}
            onClick={() => setShowNewTaskDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle tâche
          </Button>
        </div>
      </div>

      {/* Vue Kanban */}
      {view === 'kanban' && (
       <Kanban tasks={filteredTasks} tasksByStatus={tasksByStatus} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} setEditingTask={setEditingTask} />
      )}

      {/* Vue Calendrier */}
      {view === "calendar" && (
        <CalendarView
          tasks={filteredTasks}
          onTaskClick={(task) => setEditingTask(task)}
        />
      )}

      {/* Dialogs */}
      <TaskDialog
        open={showNewTaskDialog}
        onOpenChange={setShowNewTaskDialog}
        task={null}
        templates={goalDetails.taskTemplates}
        onSubmit={onCreateTask}
        selectedTemplate={selectedTemplate}
        onTemplateSelect={setSelectedTemplate}
      />

      <TaskDialog
        open={!!editingTask}
        onOpenChange={() => setEditingTask(null)}
        task={editingTask}
        templates={goalDetails.taskTemplates}
        onSubmit={onUpdateTask}
      />

      <FiltersDialog
        open={showFilters}
        onOpenChange={setShowFilters}
        filters={filters}
        onFiltersChange={setFilters}
        teamMembers={goalDetails.team}
      />
    </div>
  );
};

export default TasksTab;
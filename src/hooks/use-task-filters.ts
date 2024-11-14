import { useMemo } from "react";

import { Task, TaskPriority } from "@/app/tracker/types";
import { isWithinInterval } from "date-fns";

interface TaskFilters {
  assignee: string | null;
  priority: TaskPriority | null;
  category: string | null;
  dateRange: { from: string | null; to: string | null };
  labels: string[];
}

export const useTaskFilters = (tasks: Task[], filters: TaskFilters) => {
  return useMemo(() => {
    return tasks.filter((task) => {
      const matchesAssignee =
        !filters.assignee ||
        task.assignees?.some((a) => a.id === filters.assignee);
      const matchesPriority =
        !filters.priority || task.priority === filters.priority;
      const matchesCategory =
        !filters.category || task.category === filters.category;
      const matchesDateRange =
        !filters.dateRange.from ||
        !filters.dateRange.to ||
        (task.deadline &&
          isWithinInterval(new Date(task.deadline), {
            start: new Date(filters.dateRange.from),
            end: new Date(filters.dateRange.to),
          }));
      const matchesLabels =
        filters.labels.length === 0 ||
        filters.labels.every((label) => task.labels?.includes(label));

      return (
        matchesAssignee &&
        matchesPriority &&
        matchesCategory &&
        matchesDateRange &&
        matchesLabels
      );
    });
  }, [tasks, filters]);
};

import { mockKPIs, mockHistoricalData, mockMetrics, mockResources, mockTasks, mockTaskTemplates, mockUpdates } from "./mockData";

import { mockUsers } from "./mockData";
import { GoalDetails } from "../types";

export const mockGoalDetails: GoalDetails = {
  startDate: "2024-01-01",
  deadline: "2024-12-31",
  status: "in_progress",
  priority: "high",
  assignees: mockUsers.slice(0, 2),
  team: mockUsers,
  description:
    "Développement et déploiement d'une nouvelle plateforme e-commerce internationale",
  tasks: mockTasks,
  taskTemplates: mockTaskTemplates,
  milestones: [
    {
      id: "m1",
      title: "Phase 1: Analyse et Design",
      description: "Analyse des besoins et conception de l'architecture",
      date: "2024-03-31",
      completed: true,
      priority: "high",
      tasksCount: 8,
      completedTasksCount: 8,
      assignees: mockUsers.slice(0, 2),
      dependencies: [],
    },
    {
      id: "m2",
      title: "Phase 2: Développement MVP",
      description: "Développement des fonctionnalités core",
      date: "2024-06-30",
      completed: false,
      priority: "high",
      tasksCount: 12,
      completedTasksCount: 4,
      assignees: mockUsers.slice(1, 3),
      dependencies: ["m1"],
    },
    {
      id: "m3",
      title: "Phase 3: Tests et Déploiement",
      description: "Tests d'intégration et déploiement production",
      date: "2024-09-30",
      completed: false,
      priority: "medium",
      tasksCount: 10,
      completedTasksCount: 0,
      assignees: mockUsers.slice(2, 4),
      dependencies: ["m2"],
    },
  ],
  dependencies: {
    blockedBy: [
      { id: 201, title: "Infrastructure Cloud", status: "completed" },
      { id: 202, title: "API Gateway", status: "in_progress" },
    ],
    blocking: [
      { id: 301, title: "Marketing International", status: "pending" },
      { id: 302, title: "Support Client 24/7", status: "pending" },
    ],
  },
  updates: mockUpdates,
  metrics: mockMetrics,
  resources: [
    ...mockResources,
    {
      id: "r2",
      type: "file",
      name: "Architecture_Technique.pdf",
      url: "/files/architecture.pdf",
      createdAt: "2024-03-16T10:00:00Z",
      updatedAt: "2024-03-16T10:00:00Z",
      description: "Documentation technique détaillée",
      tags: ["documentation", "architecture"],
      relations: {
        milestoneId: "m1",
      },
      addedBy: mockUsers[1],
    },
  ],
  progress: 35,
  updateSettings: {
    allowComments: true,
    allowReactions: true,
    allowAttachments: true,
    allowMentions: true,
    notificationPreferences: {
      mentions: true,
      allUpdates: true,
      milestones: true,
      tasks: true,
    },
  },
  kpis: mockKPIs,
  historicalData: mockHistoricalData,
  tags: [
    { id: "t1", name: "e-commerce", color: "#60A5FA" },
    { id: "t2", name: "international", color: "#34D399" },
    { id: "t3", name: "high-priority", color: "#F87171" },
  ],
};

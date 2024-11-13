import { 
  User, Task, Milestone, Resource, Dependency, 
  Update, Risk, Metrics, Goal, StylesByType 
} from './types';

// Mock Users
export const mockUsers: User[] = [
  { id: "1", name: "Alex Dubois", avatar: "/api/placeholder/32/32" },
  { id: "2", name: "Marie Chen", avatar: "/api/placeholder/32/32" },
  { id: "3", name: "John Smith", avatar: "/api/placeholder/32/32" },
  { id: "4", name: "Sarah Johnson", avatar: "/api/placeholder/32/32" },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Analyse des besoins",
    completed: true,
    deadline: "2024-02-01",
    priority: "high",
    assignees: [mockUsers[0], mockUsers[1]]
  },
  {
    id: "2",
    title: "Design UX/UI",
    completed: true,
    deadline: "2024-03-15",
    priority: "medium",
    assignees: [mockUsers[1]]
  },
  // ... existing tasks with proper typing
];

// Mock Milestones
export const mockMilestones: Milestone[] = [
  {
    id: "1",
    title: "Phase initiale",
    description: "Définition des objectifs et planification du projet",
    date: "2024-01-15",
    completed: true,
    priority: "high",
    tasksCount: 5,
    completedTasksCount: 5,
    assignees: mockUsers.slice(0, 2),
    dependencies: []
  }
];

// Mock Resources
export const mockResources: Resource[] = [
  {
    id: "1",
    type: "file",
    name: "Cahier des charges.pdf",
    url: "/files/cahier-charges.pdf",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    description: "Document initial du projet",
    tags: ["documentation", "specs"],
    relations: {},
    addedBy: mockUsers[0]
  }
];

// Mock Updates
export const mockUpdates: Update[] = [
  {
    id: "1",
    type: "milestone",
    objectId: "1",
    objectTitle: "Phase initiale",
    content: "Design validé par l'équipe",
    createdAt: "2024-03-15",
    author: mockUsers[0],
    reactions: [
      {
        emoji: "👍",
        count: 3,
        users: ["1", "2", "3"]
      }
    ]
  },
  {
    id: "2",
    type: "task",
    objectId: "1",
    objectTitle: "Analyse des besoins",
    content: "Analyse terminée",
    createdAt: "2024-03-15",
    author: mockUsers[0],
    reactions: []
  },
  {
    id: "3",
    type: "event",
    eventType: "team_update",
    metadata: {},
    content: "Réunion de planification du projet",
    createdAt: "2024-03-15",
    author: mockUsers[0],
    reactions: []
  },
  {
    id: "4",
    type: "event",
    eventType: "metrics_change",
    metadata: {},
    content: "Budget mis à jour",
    createdAt: "2024-03-15",
    author: mockUsers[0],
    reactions: []
  }
];

// Mock Metrics
export const mockMetrics: Metrics = {
  timeSpent: 120,
  estimatedTimeLeft: 80,
  budget: {
    allocated: 50000,
    spent: 30000,
  },
  risks: [
    { severity: "medium", title: "Délai serré pour les tests" },
    { severity: "low", title: "Dépendance technique" },
  ]
};

// Updated Goal mock using the above objects
export const mockGoal: Goal = {
  id: 1,
  title: "Site E-commerce",
  type: "fondation",
  level: 0,
  progress: 90,
  connections: [5],
  description: "Développement Frontend",
  details: {
    startDate: "2024-01-15",
    deadline: "2024-06-30",
    status: "En cours",
    priority: "high",
    assignees: mockUsers.slice(0, 2),
    team: mockUsers,
    description: "Ce projet vise à développer une application mobile innovante qui révolutionnera la façon dont les utilisateurs interagissent avec leurs objectifs personnels et professionnels.",
    tasks: mockTasks,
    milestones: mockMilestones,
    dependencies: {
      blockedBy: [
        { id: 101, title: "Infrastructure Cloud", status: "completed" },
        { id: 102, title: "API Backend", status: "in_progress" }
      ],
      blocking: [
        { id: 201, title: "Déploiement Production", status: "pending" }
      ]
    },
    updates: mockUpdates,
    metrics: mockMetrics,
    resources: mockResources,
    progress: 60,
    updateSettings: {
      allowComments: true,
      allowReactions: true,
      allowAttachments: true,
      allowMentions: true,
      notificationPreferences: {
        mentions: true,
        allUpdates: false,
        milestones: true,
        tasks: true,
      },
    }
  }
};

export const typeStyles: StylesByType = {
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
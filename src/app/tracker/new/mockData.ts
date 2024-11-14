import { 
  User, Task, Milestone, Resource, Dependency, 
  Update, Risk, Metrics, Goal, StylesByType, KPI, TaskTemplate
} from '../types';

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
    description: "Analyse détaillée des besoins du projet",
    status: "completed",
    priority: "high",
    deadline: "2024-02-01",
    assignees: [mockUsers[0], mockUsers[1]],
    estimatedTime: 16,
    timeSpent: 14,
    subtasks: [
      { id: "st1", title: "Interviews stakeholders", completed: true },
      { id: "st2", title: "Document requirements", completed: true }
    ],
    checklist: [
      { id: "cl1", text: "Prepare questionnaire", completed: true },
      { id: "cl2", text: "Schedule meetings", completed: true }
    ],
    category: "planning",
    labels: ["analysis", "documentation"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-01T15:30:00Z"
  },
  {
    id: "2",
    title: "Design UX/UI",
    status: "completed",
    deadline: "2024-03-15",
    priority: "medium",
    assignees: [mockUsers[1]],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    subtasks: [],
    checklist: [],
  },
  {
    id: "3",
    title: "Développement Frontend",
    status: "in_progress",
    priority: "high",
    assignees: [mockUsers[0]],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    subtasks: [],
    checklist: [],
  }
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



// Mock KPIs
export const mockKPIs: KPI[] = [
  {
    id: "1",
    name: "Velocity",
    value: 85,
    target: 90,
    unit: "points",
    type: "number",
    color: "#60A5FA",
    trend: {
      value: 5,
      direction: "up",
      isPositive: true
    },
    history: [
      { date: "2024-02-15", value: 75 },
      { date: "2024-02-22", value: 78 },
      { date: "2024-03-01", value: 80 },
      { date: "2024-03-08", value: 82 },
      { date: "2024-03-15", value: 85 }
    ]
  },
  {
    id: "2",
    name: "Code Coverage",
    value: 92,
    target: 95,
    unit: "%",
    type: "percentage",
    color: "#34D399",
    trend: {
      value: 2,
      direction: "up",
      isPositive: true
    },
    history: [
      { date: "2024-02-15", value: 88 },
      { date: "2024-02-22", value: 89 },
      { date: "2024-03-01", value: 90 },
      { date: "2024-03-08", value: 91 },
      { date: "2024-03-15", value: 92 }
    ]
  }
];

// Mock Historical Data
export const mockHistoricalData = {
  tasks: [
    { date: "2024-02-15", completed: 5, total: 20 },
    { date: "2024-02-22", completed: 8, total: 20 },
    { date: "2024-03-01", completed: 12, total: 22 },
    { date: "2024-03-08", completed: 15, total: 22 },
    { date: "2024-03-15", completed: 18, total: 25 }
  ],
  budget: [
    { date: "2024-02-15", spent: 10000 },
    { date: "2024-02-22", spent: 15000 },
    { date: "2024-03-01", spent: 22000 },
    { date: "2024-03-08", spent: 26000 },
    { date: "2024-03-15", spent: 30000 }
  ],
  time: [
    { date: "2024-02-15", spent: 40 },
    { date: "2024-02-22", spent: 65 },
    { date: "2024-03-01", spent: 85 },
    { date: "2024-03-08", spent: 100 },
    { date: "2024-03-15", spent: 120 }
  ]
};

export const mockMetrics: Metrics = {
  time: {
    timeSpent: 120,
    estimated: 200,
    estimatedTimeLeft: 80,
    unit: 'hours',
    lastUpdated: "2024-03-15T10:00:00Z",
    timeline: {
      planned: 200,
      actual: 120,
      variance: -20
    }
  },
  budget: {
    allocated: 50000,
    spent: 30000,
    currency: "EUR",
    lastUpdated: "2024-03-15T10:00:00Z",
    breakdown: [
      {
        category: "Development",
        amount: 20000,
        percentage: 66.7
      },
      {
        category: "Design",
        amount: 8000,
        percentage: 26.7
      },
      {
        category: "Testing",
        amount: 2000,
        percentage: 6.6
      }
    ]
  },
  risks: {
    risks: [
      { severity: "medium", title: "Délai serré pour les tests" },
      { severity: "low", title: "Dépendance technique" }
    ],
    riskScore: 0.4,
    lastAssessment: "2024-03-15T10:00:00Z",
    mitigationPlans: [
      {
        riskId: "1",
        plan: "Augmenter l'équipe de test",
        status: "in_progress"
      }
    ]
  },
  performance: {
    kpis: mockKPIs,
    qualityScore: 0.88,
    efficiency: 0.92
  },
  lastUpdated: "2024-03-15T10:00:00Z",
  nextReview: "2024-03-22T10:00:00Z"
};

// Add mock templates
export const mockTaskTemplates: TaskTemplate[] = [
  {
    id: "template1",
    title: "Bug Fix Template",
    description: "Standard template for bug fixes",
    estimatedTime: 4,
    priority: "medium",
    checklist: [
      { id: "c1", text: "Reproduce issue", completed: false },
      { id: "c2", text: "Write test case", completed: false },
      { id: "c3", text: "Fix bug", completed: false },
      { id: "c4", text: "Update documentation", completed: false }
    ],
    category: "development",
    labels: ["bug", "maintenance"]
  },
  {
    id: "template2",
    title: "Feature Development",
    description: "Standard template for new features",
    estimatedTime: 8,
    priority: "high",
    checklist: [
      { id: "c5", text: "Design review", completed: false },
      { id: "c6", text: "Implementation", completed: false },
      { id: "c7", text: "Testing", completed: false },
      { id: "c8", text: "Documentation", completed: false }
    ],
    category: "development",
    labels: ["feature", "development"]
  }
];

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
    description:
      "Ce projet vise à développer une application mobile innovante qui révolutionnera la façon dont les utilisateurs interagissent avec leurs objectifs personnels et professionnels.",
    tasks: mockTasks,
    taskTemplates: mockTaskTemplates,
    milestones: mockMilestones,
    dependencies: {
      blockedBy: [
        { id: 101, title: "Infrastructure Cloud", status: "completed" },
        { id: 102, title: "API Backend", status: "in_progress" },
      ],
      blocking: [
        { id: 201, title: "Déploiement Production", status: "pending" },
      ],
    }, 
    metrics: mockMetrics,
    kpis: mockKPIs, // Add KPIs to the goal details
    historicalData: mockHistoricalData, // Add historical data
    updates: mockUpdates,
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
    },
  },
};

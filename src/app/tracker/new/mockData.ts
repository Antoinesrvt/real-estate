import { Goal, TypeStyles, StylesByType } from './types';

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
    assignees: [
      { id: "1", name: "Alex Dubois", avatar: "/api/placeholder/32/32" },
      { id: "2", name: "Marie Chen", avatar: "/api/placeholder/32/32" },
    ],
    team: [
      { id: "1", name: "Alex Dubois", avatar: "/api/placeholder/32/32" },
      { id: "2", name: "Marie Chen", avatar: "/api/placeholder/32/32" },
      { id: "3", name: "John Smith", avatar: "/api/placeholder/32/32" },
      { id: "4", name: "Sarah Johnson", avatar: "/api/placeholder/32/32" },
    ],
    description:
      "Ce projet vise à développer une application mobile innovante qui révolutionnera la façon dont les utilisateurs interagissent avec leurs objectifs personnels et professionnels.",
    tasks: [
      {
        id: 1,
        title: "Analyse des besoins",
        completed: true,
        deadline: "2024-02-01",
      },
      { 
        id: 2, 
        title: "Design UX/UI", 
        completed: true, 
        deadline: "2024-03-15" 
      },
      {
        id: 3,
        title: "Développement MVP",
        completed: false,
        deadline: "2024-05-01",
        alert: "Retard potentiel",
      },
      {
        id: 4,
        title: "Tests utilisateurs",
        completed: false,
        deadline: "2024-06-01",
      },
    ],
    milestones: [
      {
        id: "1",
        title: "Phase initiale",
        description: "Définition des objectifs et planification du projet",
        date: "2024-01-15",
        completed: true,
        priority: "high",
        tasksCount: 5,
        completedTasksCount: 5,
        assignees: [
          {
            id: "user1",
            name: "John Doe",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
          },
          {
            id: "user2",
            name: "Jane Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
          },
        ],
        dependencies: [],
      },
    ],
    dependencies: {
      blockedBy: [
        { id: 101, title: "Infrastructure Cloud", status: "completed" },
        { id: 102, title: "API Backend", status: "in_progress" },
      ],
      blocking: [
        { id: 201, title: "Déploiement Production", status: "pending" },
      ],
    },
    updates: [
      {
        id: "1",
        date: "2024-03-15",
        author: "Alex",
        content: "Design validé par l'équipe",
        type: "milestone",
        relatedId: "1",
        reactions: [
          {
            id: "1",
            emoji: "👍",
            count: 3,
            users: ["1", "2", "3"]
          },
          {
            id: "2",
            emoji: "🎉",
            count: 2,
            users: ["2", "4"]
          }
        ],
        mentions: ["2", "3"],
      },
      {
        id: "2",
        date: "2024-03-10",
        author: "Marie",
        content: "Début de l'intégration frontend",
        type: "task",
        relatedId: "3",
        attachments: [
          {
            id: "1",
            type: "image",
            url: "/screenshots/dashboard-v1.png",
            name: "Dashboard Preview",
            thumbnail: "/screenshots/dashboard-v1-thumb.png",
          }
        ],
      },
    ],
    metrics: {
      timeSpent: 120,
      estimatedTimeLeft: 80,
      budget: {
        allocated: 50000,
        spent: 30000,
      },
      risks: [
        { severity: "medium", title: "Délai serré pour les tests" },
        { severity: "low", title: "Dépendance technique" },
      ],
    },
    resources: [
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
        addedBy: {
          id: "1",
          name: "Alex Dubois",
          avatar: "/api/placeholder/32/32"
        }
      }
    ],
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
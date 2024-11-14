export type ResourceType = "file" | "link";

export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in_progress" | "completed" | "pending";
export type RecurringFrequency = "daily" | "weekly" | "monthly";



export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskTemplate {
  id: string;
  title: string;
  description?: string;
  estimatedTime?: number;
  priority: Priority;
  checklist: ChecklistItem[];
  category?: string;
  labels?: string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  deadline?: string;
  alert?: string;
  assignees: User[];
  estimatedTime?: number;
  timeSpent?: number;
  subtasks: SubTask[];
  checklist: ChecklistItem[];
  recurring?: {
    frequency: RecurringFrequency;
    endDate?: string;
  };
  category?: string;
  labels?: string[];
  templateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description?: string;
  dependencies?: string[];
  tasksCount?: number;
  completedTasksCount?: number;
  assignees?: User[];
  priority?: Priority;
}

export interface Resource {
  id: string;
  type: ResourceType;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  size?: number;
  extension?: string;
  icon?: string;
  relations: {
    milestoneId?: string;
    taskId?: string;
  };
  tags?: string[];
  addedBy: User;
}

export interface Dependency {
  id: number;
  title: string;
  status: Status;
}

export interface Mention {
  userId: string;
  username: string;
  startIndex: number;
  endIndex: number;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[]; // User IDs who reacted
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  editedAt?: string;
  mentions?: Mention[];
  reactions?: Reaction[];
}

export interface UpdateAttachment {
  id: string;
  type: 'image' | 'file' | 'link';
  url: string;
  name: string;
  size?: number;
  mimeType?: string;
  thumbnail?: string;
}

export type UpdateObjectType = 'comment' | 'milestone' | 'task' | 'resource' | 'event';

export interface BaseUpdate {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  mentions?: Mention[];
  reactions?: Reaction[];
  comments?: Comment[];
  attachments?: UpdateAttachment[];
  edited?: boolean;
  editedAt?: string;
  editedBy?: string;
}

export interface ObjectUpdate extends BaseUpdate {
  type: Exclude<UpdateObjectType, "event">;
  objectId: string;
  objectTitle: string;
  objectIcon?: string;
}

export interface EventUpdate extends BaseUpdate {
  type: "event";
  eventType: "team_update" | "metrics_change" | "goal_update";
  metadata: {
    previous?: any;
    current?: any;
    action?: string;
  };
}

export type Update = ObjectUpdate | EventUpdate;

export interface Risk {
  severity: Priority;
  title: string;
}

export interface GoalDetails {
  startDate: string;
  deadline: string;
  status: string;
  priority: Priority;
  assignees: User[];
  description: string;
  tasks: Task[];
  taskTemplates: TaskTemplate[];
  milestones: Milestone[];
  dependencies: {
    blockedBy: Dependency[];
    blocking: Dependency[];
  };
  updates: Update[];
  metrics: Metrics;
  resources: Resource[];
  progress: number;
  team: User[]; // All team members, not just assignees
  updateSettings?: {
    allowComments: boolean;
    allowReactions: boolean;
    allowAttachments: boolean;
    allowMentions: boolean;
    notificationPreferences: {
      mentions: boolean;
      allUpdates: boolean;
      milestones: boolean;
      tasks: boolean;
    };
  };
  kpis: KPI[];
  historicalData: {
    tasks: Array<{ date: string; completed: number; total: number }>;
    budget: Array<{ date: string; spent: number }>;
    time: Array<{ date: string; spent: number }>;
  };
  tags?: Tag[];
}

export interface Goal {
  id: number;
  title: string;
  type: "fondation" | "action" | "strategie" | "vision";
  level: number;
  progress: number;
  connections: number[];
  description: string;
  details?: GoalDetails;
}

export interface TypeStyles {
  background: string;
  border: string;
  text: string;
  shadow: string;
  glow: string;
  connection: string;
}

export interface StylesByType {
  fondation: TypeStyles;
  action: TypeStyles;
  strategie: TypeStyles;
  vision: TypeStyles;
}

export interface BudgetMetrics {
  allocated: number;
  spent: number;
  currency?: string;
  lastUpdated?: string;
  breakdown?: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface TimeMetrics {
  timeSpent: number;
  estimated: number;
  estimatedTimeLeft: number;
  unit: 'hours' | 'days' | 'weeks';
  lastUpdated?: string;
  timeline?: {
    planned: number;
    actual: number;
    variance: number;
  };
}

export interface RiskMetrics {
  risks: Risk[];
  riskScore?: number;
  lastAssessment?: string;
  mitigationPlans?: {
    riskId: string;
    plan: string;
    status: 'planned' | 'in_progress' | 'completed';
  }[];
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  type: "percentage" | "number" | "currency" | "time";
  color?: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "stable";
    isPositive: boolean;
  };
  history?: Array<{
    date: string;
    value: number;
  }>;
}


export interface PerformanceMetrics {
  kpis?: KPI[];
  qualityScore?: number;
  efficiency?: number;
}

export interface Metrics {
  time: TimeMetrics;
  budget: BudgetMetrics;
  risks: RiskMetrics;
  performance?: PerformanceMetrics;
  lastUpdated: string;
  nextReview?: string;
}


export interface HistoricalData {
  tasks: Array<{ date: string; completed: number; total: number }>;
  budget: Array<{ date: string; spent: number }>;
  time: Array<{ date: string; spent: number }>;
}

export interface Prediction {
  time: {
    trend: number;
    estimatedCompletion: string;
    predictedTotal: number;
  };
  budget: {
    trend: number;
    predictedTotal: number;
    burndownRate: number;
  };
  tasks: {
    trend: number;
    completionRate: number;
    predictedEndDate: string;
  };
}
export type ResourceType = "file" | "link";

export type Priority = "low" | "medium" | "high";

export type Status = "completed" | "in_progress" | "pending";

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string | number;
  title: string;
  completed: boolean;
  deadline: string;
  alert?: string;
  description?: string;
  assignees?: User[];
  priority?: Priority;
  status?: Status;
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

export interface Metrics {
  timeSpent: number;
  estimatedTimeLeft: number;
  budget: {
    allocated: number;
    spent: number;
  };
  risks: Risk[];
}

export interface GoalDetails {
  startDate: string;
  deadline: string;
  status: string;
  priority: Priority;
  assignees: User[];
  description: string;
  tasks: Task[];
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
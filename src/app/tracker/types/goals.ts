import { Task, TaskTemplate } from "./tasks";
import { Milestone } from "./milestones";
import { Resource } from "./resources";
import { Update } from "./updates";
import { Metrics, KPI, HistoricalData, Prediction } from "./metrics";
import { Priority, User, Tag } from "./common";
import { Dependency } from "@/types/types";

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
  team: User[];
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
  historicalData: HistoricalData;
  predictions?: Prediction;
  tags?: Tag[];
  lastUpdated?: string;
  nextReview?: string;
  customFields?: Record<string, any>;
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
  createdAt?: string;
  updatedAt?: string;
  category?: string;
  order?: number;
}

export interface TypeStyles {
  background: string;
  border: string;
  text: string;
  shadow: string;
  glow: string;
  connection: string;
  progress: string;
}

export interface StylesByType {
  fondation: TypeStyles;
  action: TypeStyles;
  strategie: TypeStyles;
  vision: TypeStyles;
}

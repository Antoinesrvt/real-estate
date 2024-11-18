 import { Priority, User, Tag } from "./common";

 export type TaskStatus = "todo" | "in_progress" | "completed";
 export type TaskPriority = Priority;
 export type RecurringFrequency = "daily" | "weekly" | "monthly";

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
   priority: TaskPriority;
   checklist: ChecklistItem[];
   category?: string;
   labels?: string[];
 }

 export interface Task {
   id: string;
   title: string;
   description?: string;
   status: TaskStatus;
   priority: TaskPriority;
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
export type ResourceType = "file" | "link";
export type Priority = "low" | "medium" | "high";
export type Status = 'completed' | 'in_progress' | 'pending' | 'todo';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
}
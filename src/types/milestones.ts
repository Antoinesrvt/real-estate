 import { Priority, User } from "./common";

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
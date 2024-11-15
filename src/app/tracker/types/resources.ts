import { ResourceType, User, Tag } from './common';

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
  tags?: Tag[];
  addedBy: User;
}
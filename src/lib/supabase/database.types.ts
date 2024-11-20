export type Json = Record<string, any>

// Database schema types
// - Table definitions
// - Function types
// - Enum types

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          subscription_plan: string
          created_at: string
          settings: Json
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          subscription_plan?: string
          created_at?: string
          settings?: Json
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          subscription_plan?: string
          created_at?: string
          settings?: Json
          is_active?: boolean
        }
      }
      workspaces: {
        Row: {
          id: string
          name: string
          organization_id: string
          settings: Json
          is_active: boolean
          created_at: string
          updated_at: string
        },
        Insert: {
          id?: string
          name: string
          organization_id: string
        },
        Update: {
          id?: string
          name?: string
          organization_id?: string
          settings?: Json
          is_active?: boolean
        }
      }
      goals: {
        Row: {
          id: string
          title: string
          description: string | null
          workspace_id: string
          parent_goal_id: string | null
          status: Database['public']['Enums']['goal_status']
          progress: number
          type: Database['public']['Enums']['goal_type']
          connections: Json
          start_date: string | null
          end_date: string | null
          config_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          workspace_id: string
          parent_goal_id?: string | null
          status?: Database['public']['Enums']['goal_status']
          progress?: number
          connections?: Json
          type?: Database['public']['Enums']['goal_type']
          start_date?: string | null
          end_date?: string | null
          config_id: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          workspace_id?: string
          parent_goal_id?: string | null
          status?: Database['public']['Enums']['goal_status']
          progress?: number
          connections?: Json
          type?: Database['public']['Enums']['goal_type']
          start_date?: string | null
          end_date?: string | null
          config_id?: string
        }
      }
    }
    Functions: {
      calculate_goal_progress: {
        Args: { goal_id: string }
        Returns: number
      }
    }
    Enums: {
      goal_status: 'draft' | 'active' | 'completed' | 'archived' | 'blocked'
      goal_type: 'fondation' | 'action' | 'strategie' | 'vision'
      task_status: 'todo' | 'in_progress' | 'completed' | 'blocked'
      task_priority: 'low' | 'medium' | 'high' | 'critical'
      resource_type: 'file' | 'link' | 'document'
      team_role: 'owner' | 'admin' | 'member' | 'viewer'
      update_type: 'comment' | 'status_change' | 'progress_update' | 'milestone' | 'assignment'
      audit_action: 'create' | 'update' | 'delete' | 'archive' | 'restore'
    }
  }
} 
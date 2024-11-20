import { useCallback, useEffect, useState } from 'react'
import { createClient } from './index'
import type { Tables } from './index'

export const useGoals = (workspaceId?: string) => {
  const [goals, setGoals] = useState<Tables['goals']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  const fetchGoals = useCallback(async () => {
    if (!workspaceId) {
      setGoals([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('goals')
        .select(`
          *,
          milestones (*),
          tasks (*),
          metrics (*)
        `)
        .eq('workspace_id', workspaceId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setGoals(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch goals'))
    } finally {
      setLoading(false)
    }
  }, [workspaceId])

  useEffect(() => {
    fetchGoals()
  }, [fetchGoals])

  return { goals, loading, error, refetch: fetchGoals }
}

export const useTasks = () => {
  const supabase = createClient()

  const getTasks = useCallback(async (goalId: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        subtasks (*),
        checklist_items (*)
      `)
      .eq('goal_id', goalId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }, [])

  return { getTasks }
}
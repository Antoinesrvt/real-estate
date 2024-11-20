import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/database.types'

type DbGoal = Database['public']['Tables']['goals']['Row']

export function useGoals(workspaceId?: string) {
  const [goals, setGoals] = useState<DbGoal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  const fetchGoals = useCallback(async () => {
    if (!workspaceId) return
    try {
      setLoading(true)
      const { data: goalsData, error: goalsError } = await supabase
        .from('goals')
        .select(`
          *,
          connections:goal_connections(*)
        `)
        .eq('workspace_id', workspaceId)
        .order('level', { ascending: true })

      if (goalsError) throw goalsError

      setGoals(goalsData)
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
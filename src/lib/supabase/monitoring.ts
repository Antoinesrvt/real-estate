'use server'

import { createServerSupabase } from './server'
import { SupabaseError } from './errors'

interface DatabaseMetrics {
  query_count: number
  total_exec_time: number
  mean_exec_time: number
  rows_processed: number
}

/**
 * Monitors database performance and health
 * Used for:
 * - Tracking query performance
 * - Identifying slow queries
 * - Monitoring database load
 * - Detecting potential issues
 */
export async function monitorDatabaseHealth(): Promise<DatabaseMetrics> {
  try {
    const supabase = await createServerSupabase()
    
    const { data, error } = await supabase
      .rpc('get_database_metrics')
      
    if (error) {
      throw new SupabaseError(
        error.message,
        'MONITORING_ERROR',
        500
      )
    }

    return data as DatabaseMetrics
  } catch (error) {
    handleMonitoringError(error)
    throw error
  }
}

const handleMonitoringError = (error: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('Database monitoring error:', error)
  }
  // In production, send to error reporting service
} 
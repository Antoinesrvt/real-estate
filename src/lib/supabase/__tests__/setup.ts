import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '../database.types'
import { generateTestData } from './helpers/generate-test-data'

export const createTestClient = () => {
  if (!process.env.SUPABASE_TEST_URL || !process.env.SUPABASE_TEST_KEY) {
    throw new Error('Missing test environment variables')
  }

  return createBrowserClient<Database>(
    process.env.SUPABASE_TEST_URL,
    process.env.SUPABASE_TEST_KEY
  )
}

export const setupTestEnvironment = async () => {
  const supabase = createTestClient()
  await generateTestData(supabase)
  return supabase
} 
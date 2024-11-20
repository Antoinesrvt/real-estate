'use client'

// Central configuration hub
// - Exports all Supabase utilities
// - Type definitions
// - Environment variables 

import { createBrowserClient } from '@supabase/ssr'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './database.types'


// Type exports
export type Tables = Database['public']['Tables']
export type Enums = Database['public']['Enums']

// Environment variable validation
const getEnvironmentVariable = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

// Constants
export const SUPABASE_URL = getEnvironmentVariable('NEXT_PUBLIC_SUPABASE_URL')
export const SUPABASE_ANON_KEY = getEnvironmentVariable('NEXT_PUBLIC_SUPABASE_ANON_KEY')
export const SUPABASE_SERVICE_ROLE_KEY = getEnvironmentVariable('SUPABASE_SERVICE_ROLE_KEY')

// Type exports
export type { Database }
export type SupabaseClient = ReturnType<typeof createBrowserClient<Database>>
export type ServerSupabaseClient = ReturnType<typeof createServerClient<Database>>

// Re-export client and server functions
export { createClient } from './client'
export { createServerSupabase } from './server'

// Helper function to create cookie options
export const createCookieOptions = (options?: Partial<CookieOptions>): CookieOptions => ({
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  ...options,
}) 
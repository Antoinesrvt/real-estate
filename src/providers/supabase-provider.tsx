'use client'

// React context provider
// - Global Supabase access
// - State management
// - Authentication flow

import { createContext, useContext, PropsWithChildren } from 'react'
import { useSupabase } from '@/hooks/use-supabase'
import type { SupabaseClient } from "@/lib/supabase";
import { createClient } from '@/lib/supabase/client';

interface SupabaseContextType {
  supabase: SupabaseClient;
  user: ReturnType<typeof useSupabase>["user"];
  session: ReturnType<typeof useSupabase>["session"];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function SupabaseProvider({ children }: PropsWithChildren) {
  const supabaseState = useSupabase()
  const supabaseClient = createClient()

  const value: SupabaseContextType = {
    supabase: supabaseClient,
    user: supabaseState.user,
    session: supabaseState.session,
    isLoading: supabaseState.isLoading,
    error: supabaseState.error,
    refresh: async () => {
      await supabaseState.signOut()
      await supabaseState.signIn('', '') // Force refresh
    }
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabaseContext() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabaseContext must be used within a SupabaseProvider')
  }
  return context
} 
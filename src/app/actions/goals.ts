'use server'

import { createServerSupabase } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateGoalProgress(goalId: string, progress: number) {
  const supabase = await createServerSupabase()
  
  const { error } = await supabase
    .from('goals')
    .update({ progress })
    .eq('id', goalId)

  if (error) throw error
  
  revalidatePath('/dashboard')
} 
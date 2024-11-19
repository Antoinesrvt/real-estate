export class SupabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message)
    this.name = 'SupabaseError'
  }
}

export const handleSupabaseError = (error: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('Supabase error:', error)
  }
  // Add error reporting service here
} 
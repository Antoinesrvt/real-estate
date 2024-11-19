declare global {
  interface Window {
    __SUPABASE_DEV__: {
      config: import('@/lib/supabase/dev-config').DevConfig
      utils: typeof import('@/lib/supabase/dev-utils').devUtils
    }
  }
}

export {} 
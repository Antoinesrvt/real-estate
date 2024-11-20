'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export default function NewWorkspace() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First, get or create organization
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: `${name}'s Organization`,
          subscription_plan: 'free',
          settings: {}
        })
        .select()
        .single()

      if (orgError) throw orgError

      // Create workspace
      const { data: workspace, error: workspaceError } = await supabase
        .from('workspaces')
        .insert({
          name,
          organization_id: org.id,
          settings: {}
        })
        .select()
        .single()

      if (workspaceError) throw workspaceError

      // Assign user as owner
      const { error: assignmentError } = await supabase
        .from('team_assignments')
        .insert({
          user_id: user.id,
          assignable_id: org.id,
          assignable_type: 'organization',
          role: 'owner'
        })

      if (assignmentError) throw assignmentError

      toast({
        title: 'Workspace created!',
        description: 'Redirecting to dashboard...'
      })

      router.push('/dashboard')
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create workspace',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8 bg-white/5 rounded-lg backdrop-blur-sm">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Create your workspace
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Your workspace is where you'll manage all your goals and projects
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Workspace Name
            </label>
            <Input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="My Awesome Workspace"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Workspace'}
          </Button>
        </form>
      </div>
    </div>
  )
} 
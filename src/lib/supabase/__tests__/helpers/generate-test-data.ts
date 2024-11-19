import { SupabaseClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'

export const generateTestData = async (supabase: SupabaseClient) => {
  // Generate test organization
  const { data: org } = await supabase.from('organizations').insert({
    name: faker.company.name(),
    subscription_plan: 'free',
    settings: {}
  }).select().single()

  // Generate test workspace
  const { data: workspace } = await supabase.from('workspaces').insert({
    name: faker.company.name(),
    organization_id: org.id,
    settings: {}
  }).select().single()

  // Generate test goal config
  const { data: goalConfig } = await supabase.from('goal_configs').insert({
    visualization_settings: {},
    notification_rules: {},
    permission_matrix: {}
  }).select().single()

  // Generate test goal
  const { data: goal } = await supabase.from('goals').insert({
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    workspace_id: workspace.id,
    type: 'action',
    status: 'active',
    config_id: goalConfig.id
  }).select().single()

  // Generate test tasks
  const { data: tasks } = await supabase.from('tasks').insert([
    {
      title: faker.company.catchPhrase(),
      goal_id: goal.id,
      status: 'todo',
      priority: 'medium'
    },
    {
      title: faker.company.catchPhrase(),
      goal_id: goal.id,
      status: 'in_progress',
      priority: 'high'
    }
  ]).select()

  return {
    organization: org,
    workspace: workspace,
    goalConfig: goalConfig,
    goal: goal,
    tasks: tasks
  }
} 
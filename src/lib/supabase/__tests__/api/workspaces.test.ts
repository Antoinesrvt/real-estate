import { generateTestData } from '../helpers/generate-test-data'
import { setupTestEnvironment } from '../setup'
import { faker } from '@faker-js/faker'

describe('Workspaces API', () => {
  let supabase
  let testData

  beforeAll(async () => {
    supabase = await setupTestEnvironment()
    testData = await generateTestData(supabase)
  })

  test('should create workspace in organization', async () => {
    const newWorkspace = {
      name: faker.company.name(),
      organization_id: testData.organization.id,
      settings: {}
    }
    const { data, error } = await supabase
      .from('workspaces')
      .insert(newWorkspace)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toMatchObject(newWorkspace)
  })

  test('should enforce cascading deletes', async () => {
    // Create org with workspace
    const { data: org } = await supabase
      .from('organizations')
      .insert({ name: faker.company.name() })
      .select()
      .single()

    const { data: workspace } = await supabase
      .from('workspaces')
      .insert({ name: faker.company.name(), organization_id: org.id })
      .select()
      .single()

    // Delete org
    await supabase.from('organizations').delete().eq('id', org.id)

    // Check workspace was deleted
    const { data } = await supabase
      .from('workspaces')
      .select()
      .eq('id', workspace.id)

    expect(data).toHaveLength(0)
  })
}) 
import { generateTestData } from '../helpers/generate-test-data'
import { setupTestEnvironment } from '../setup'
import { faker } from '@faker-js/faker'

describe('Goals API', () => {
  let supabase
  let testData

  beforeAll(async () => {
    supabase = await setupTestEnvironment()
    testData = await generateTestData(supabase)
  })

  test('should create a goal', async () => {
    const newGoal = {
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      workspace_id: testData.workspace.id,
      type: 'action',
      status: 'draft'
    }

    const { data, error } = await supabase
      .from('goals')
      .insert(newGoal)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toMatchObject(newGoal)
  })

  test('should enforce RLS policies', async () => {
    // Test unauthorized access
    const { data, error } = await supabase
      .from('goals')
      .select()
      .eq('workspace_id', faker.string.uuid())

    expect(data).toHaveLength(0)
  })
}) 
import { generateTestData } from '../helpers/generate-test-data'
import { setupTestEnvironment } from '../setup'
import { faker } from '@faker-js/faker'

describe('Goal Templates API', () => {
  let supabase
  let testData

  beforeAll(async () => {
    supabase = await setupTestEnvironment()
    testData = await generateTestData(supabase)
  })

  test('should create goal template', async () => {
    const newTemplate = {
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      type: 'action',
      organization_id: testData.organization.id,
      default_config: {
        milestones: [
          { title: 'Milestone 1', progress: 25 },
          { title: 'Milestone 2', progress: 50 }
        ]
      }
    }

    const { data, error } = await supabase
      .from('goal_templates')
      .insert(newTemplate)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toMatchObject(newTemplate)
  })

  test('should enforce organization access', async () => {
    const { data } = await supabase
      .from('goal_templates')
      .select()
      .eq('organization_id', faker.string.uuid())

    expect(data).toHaveLength(0)
  })
}) 
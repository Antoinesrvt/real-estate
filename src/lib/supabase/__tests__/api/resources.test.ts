import { generateTestData } from '../helpers/generate-test-data'
import { setupTestEnvironment } from '../setup'
import { faker } from '@faker-js/faker'

describe('Resources API', () => {
  let supabase
  let testData

  beforeAll(async () => {
    supabase = await setupTestEnvironment()
    testData = await generateTestData(supabase)
  })

  test('should create and link resource', async () => {
    const newResource = {
      title: faker.company.catchPhrase(),
      type: 'document',
      content: faker.lorem.paragraph(),
      organization_id: testData.organization.id,
      creator_id: testData.user.id
    }

    const { data: resource, error } = await supabase
      .from('resources')
      .insert(newResource)
      .select()
      .single()

    expect(error).toBeNull()

    // Test resource targeting
    const resourceTarget = {
      resource_id: resource.id,
      target_type: 'goal',
      target_id: testData.goal.id
    }

    const { error: targetError } = await supabase
      .from('resource_targets')
      .insert(resourceTarget)

    expect(targetError).toBeNull()
  })

  test('should enforce resource visibility', async () => {
    const { data } = await supabase
      .from('resources')
      .select()
      .eq('organization_id', faker.string.uuid())

    expect(data).toHaveLength(0)
  })
}) 
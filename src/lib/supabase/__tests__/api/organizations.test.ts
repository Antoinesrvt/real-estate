import { generateTestData } from '../helpers/generate-test-data'
import { setupTestEnvironment } from '../setup'
import { faker } from '@faker-js/faker'

describe('Organizations API', () => {
  let supabase
  let testData

  beforeAll(async () => {
    supabase = await setupTestEnvironment()
    testData = await generateTestData(supabase)
  })

  test('should create organization with valid data', async () => {
    const newOrg = {
      name: faker.company.name(),
      subscription_plan: 'free',
      settings: {}
    }
    const { data, error } = await supabase
      .from('organizations')
      .insert(newOrg)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toMatchObject(newOrg)
  })

  test('should enforce name length constraint', async () => {
    const { error } = await supabase
      .from('organizations')
      .insert({ name: 'a' }) // Too short

    expect(error).not.toBeNull()
  })

  test('should enforce RLS policies', async () => {
    const { data: otherOrg } = await supabase
      .from('organizations')
      .insert({
        name: faker.company.name(),
        user_id: faker.string.uuid() // Different user
      })

    const { data, error } = await supabase
      .from('organizations')
      .select()
      .eq('id', otherOrg.id)

    expect(data).toHaveLength(0) // Should not see other user's org
  })
}) 
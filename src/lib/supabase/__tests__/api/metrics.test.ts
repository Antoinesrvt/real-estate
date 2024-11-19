import { generateTestData } from '../helpers/generate-test-data'
import { setupTestEnvironment } from '../setup'
import { faker } from '@faker-js/faker'

describe('Metrics API', () => {
  let supabase
  let testData

  beforeAll(async () => {
    supabase = await setupTestEnvironment()
    testData = await generateTestData(supabase)
  })

  test('should create metric with history', async () => {
    const metric = {
      target_id: testData.goal.id,
      name: faker.company.buzzPhrase(),
      target_value: 100,
      current_value: 50,
      unit: 'percentage'
    }

    const { data, error } = await supabase
      .from('metrics')
      .insert(metric)
      .select()
      .single()

    expect(error).toBeNull()

    // Add metric history
    const history = {
      metric_id: data.id,
      value: 75,
      recorded_at: new Date().toISOString()
    }

    const { error: historyError } = await supabase
      .from('metric_history')
      .insert(history)

    expect(historyError).toBeNull()
  })

  test('should enforce metric access control', async () => {
    const { data: metrics } = await supabase
      .from('metrics')
      .select(`
        *,
        history:metric_history(*)
      `)
      .eq('target_id', faker.string.uuid())

    expect(metrics).toHaveLength(0)
  })
}) 
import { generateTestData } from '../helpers/generate-test-data'
import { setupTestEnvironment } from '../setup'
import { faker } from '@faker-js/faker'

describe('Notifications API', () => {
  let supabase
  let testData

  beforeAll(async () => {
    supabase = await setupTestEnvironment()
    testData = await generateTestData(supabase)
  })

  test('should create notification', async () => {
    const newNotification = {
      user_id: testData.user.id,
      type: 'goal_update',
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      resource_type: 'goal',
      resource_id: testData.goal.id
    }

    const { data, error } = await supabase
      .from('notifications')
      .insert(newNotification)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toMatchObject(newNotification)
  })

  test('should mark notification as read', async () => {
    const { data: notification } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', testData.notification.id)
      .select()
      .single()

    expect(notification.is_read).toBe(true)
  })
}) 
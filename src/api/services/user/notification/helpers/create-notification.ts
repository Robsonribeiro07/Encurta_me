import { Api } from '@/lib/axios'
import { ErrorHandler } from '@/utils/useErrorHandler'

export interface CreateNotificationParams {
  userId?: string
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  link?: string
}
export async function createNotificationHelper({
  message,
  type,
  title,
  link,
  api,
}: CreateNotificationParams & Api) {
  try {
    const response = await api.post('/user/notifications/create', {
      message,
      type,
      title,
      link,
    })
    return response.data
  } catch (error) {
    ErrorHandler(error)
    throw new Error('Failed to create notification')
  }
}

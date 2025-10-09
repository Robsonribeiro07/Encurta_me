import { Api } from '@/lib/axios'
import { ErrorHandler } from '@/utils/useErrorHandler'

export interface MarkAsReadHelperProps {
  notificationId: string
}
export async function MarkAsReadHelper({ notificationId, api }: MarkAsReadHelperProps & Api) {
  try {
    const response = await api.patch('/user/notifications/mark-as-read', {
      notificationId,
    })
    return response.data
  } catch (error) {
    ErrorHandler(error)
    throw new Error('Failed to create notification')
  }
}

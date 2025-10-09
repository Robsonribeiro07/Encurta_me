import api from '@/lib/axios'
import { AxiosInstance } from 'axios'
import { getAllNotificationHelper, IGetAllNotificationProps } from './helpers/get-all-notification'
import { createNotificationHelper, CreateNotificationParams } from './helpers/create-notification'
import { LinkNotifier } from '@/utils/notification/notification-link'
import { MarkAsReadHelper } from './helpers/mark-as-read'
import { QueryClient } from '@tanstack/react-query'

export class NotificationService {
  private api: AxiosInstance
  public notification: LinkNotifier
  public queryClient?: QueryClient

  constructor(private Token: string | null, queryClient?: QueryClient) {
    if (!Token) throw new Error('Token is required')
    this.api = api(this.Token)
    this.notification = new LinkNotifier(this)
    this.queryClient = queryClient
  }

  async createNotification(params: CreateNotificationParams) {
    return createNotificationHelper({
      api: this.api,
      ...params,
    })
  }
  async getAllNotification({ page, filter, limit }: Omit<IGetAllNotificationProps, 'api'>) {
    return await getAllNotificationHelper({
      api: this.api,
      page,
      filter,
      limit,
    })
  }
  async markAsRead(notificationId: string) {
    return await MarkAsReadHelper({ notificationId, api: this.api })
  }
}

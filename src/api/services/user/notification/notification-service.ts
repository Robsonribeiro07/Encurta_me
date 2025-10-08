import api from '@/lib/axios'
import { AxiosInstance } from 'axios'
import { getAllNotificationHelper, IGetAllNotificationProps } from './helpers/get-all-notification'

export class NotificationService {
  private api: AxiosInstance

  constructor(private Token: string | null) {
    if (!Token) throw new Error('Token is required')
    this.api = api(this.Token)
  }

  async getAllNotification({ page, filter, limit }: Omit<IGetAllNotificationProps, 'api'>) {
    return await getAllNotificationHelper({
      api: this.api,
      page,
      filter,
      limit,
    })
  }
}

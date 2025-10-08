import { AxiosInstance } from 'axios'

export interface IGetAllNotificationProps {
  api: AxiosInstance
  page?: number
  limit?: number
  filter?: 'info' | 'success' | 'warning' | 'error' | 'all' | 'read' | 'unread'
}
export interface IGetAllNotificationResult {
  _id: string
  userId: string
  type: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message: string
  read: boolean
  createdAt: string // ou Date se for convertido
  __v: number
  link?: string
}
export interface IGetAllNotificationResponse {
  notifications: IGetAllNotificationResult[]
  total: number
  page: number
  limit: number
  totalPages: number
}
export async function getAllNotificationHelper({
  api,
  page = 1,
  limit = 4,
  filter = 'all',
}: IGetAllNotificationProps): Promise<IGetAllNotificationResponse> {
  try {
    const response = await api.get('/user/notifications/all', {
      params: {
        page,
        limit,
        filter,
      },
    })

    console.log(response.data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error)
  }
}

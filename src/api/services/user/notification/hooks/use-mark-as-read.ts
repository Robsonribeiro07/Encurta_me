import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NotificationService } from '../notification-service'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import { usePaginationNotificationStore } from '@/store/notification/use-pagination-store'
import { IGetAllNotificationResponse } from '../helpers/get-all-notification'

export function useMarkAsRead() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  const { limits, filter, currentPage } = usePaginationNotificationStore()
  const { mutate, isPending } = useMutation({
    mutationFn: async (notificationId: string) => {
      const service = new NotificationService(await getToken())
      return service.markAsRead(notificationId)
    },
    onMutate(variables) {
      const previous = queryClient.getQueryData([
        'get-all-notification',
        currentPage,
        limits,
        filter,
      ])
      queryClient.setQueryData(
        ['get-all-notification', currentPage, limits, filter],
        (oldData: IGetAllNotificationResponse) => {
          if (!oldData) {
            return oldData
          }
          const newDataWithMarkRead = oldData.notifications.filter(
            (Notification) => Notification._id !== variables,
          )
          return {
            ...oldData,
            notifications: newDataWithMarkRead,
          }
        },
      )
      return { previous }
    },
    onSuccess() {
      toast.success('Notificação marcada como lida', { duration: 3000 })
    },
    onError(error, _, context) {
      if (context?.previous) {
        queryClient.setQueryData(
          ['get-all-notification', currentPage, limits, filter],
          context.previous,
        )
      }
      toast.error(error.message)
    },
  })

  const handleMarkAsRead = (notificationId: string) => {
    mutate(notificationId)
  }

  return {
    handleMarkAsRead,
    isPending,
  }
}

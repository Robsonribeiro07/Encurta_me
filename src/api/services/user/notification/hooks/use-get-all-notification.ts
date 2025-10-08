import { useQuery } from '@tanstack/react-query'
import { NotificationService } from '../notification-service'
import { useAuth } from '@clerk/nextjs'
import { usePaginationNotificationStore } from '@/store/notification/use-pagination-store'

export function useGetAllNotification() {
  const { getToken } = useAuth()
  const { currentPage, limits, filter } = usePaginationNotificationStore()

  console.log(currentPage, limits, filter)
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-all-notification', currentPage, limits, filter],
    queryFn: async () => {
      const token = await getToken()
      const service = new NotificationService(token)
      return service.getAllNotification({
        page: currentPage,
        limit: limits,
        filter: filter,
      })
    },
  })

  return {
    notifications: data,
    isLoading,
    error,
  }
}

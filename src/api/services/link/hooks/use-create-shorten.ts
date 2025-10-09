import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from '@clerk/nextjs'
import { IGetAllShortenResult } from '@/api/services/link/helpers/get-all-shorten'
import { ShortenService } from '@/api/services/link/Shorten-service'
import { useGetSearchParams } from '@/hooks/links/use-get-search-params'
import { LinkShotenType } from '@/hooks/links/use-form-create-shorten'
import { NotificationService } from '../../user/notification/notification-service'
export function useCreatedShorten() {
  const { getToken } = useAuth()
  const { currentPage, filter, filterInput } = useGetSearchParams()
  const queryClient = useQueryClient()

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async (data: LinkShotenType) => {
      const token = await getToken()
      const Shorten = new ShortenService(token)
      return Shorten.createShortenLink({
        ...data,
      })
    },
    async onSuccess(data) {
      const token = await getToken()
      const notification = new NotificationService(token, queryClient)
      notification.notification.success(data.shortenedUrl)

      queryClient.setQueryData(
        ['links', currentPage, filter, filterInput],
        (oldData: IGetAllShortenResult) => {
          if (!oldData)
            return {
              shortenedUrls: [data],
              totalPages: 1,
              currentPage: 1,
              totalItems: 1,
              totalClicks: data.clicks,
            }
          return {
            ...oldData,
            shortenedUrls: [...oldData.shortenedUrls, data],
            totalPages: oldData.totalPages ? oldData.totalPages : 1,
            totalItems: oldData.totalItems + 1,
          }
        },
      )
    },
    async onError(error, variables) {
      const token = await getToken()
      const notification = new NotificationService(token)
      await notification.notification.error(variables.originalUrl, error.message)
    },
  })

  const handleSubmitMutation = (data: LinkShotenType) => {
    console.log(data)
    mutate({
      originalUrl: data.originalUrl,
      customUrl: data.customUrl,
      expiresAt: data.expiresAt,
    })
  }

  return {
    handleSubmitMutation,
    isError,
    isPending,
  }
}

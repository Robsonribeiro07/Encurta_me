import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { IGetAllShortenResult } from '@/api/services/link/helpers/get-all-shorten'
import { ShortenService } from '@/api/services/link/Shorten-service'
import { useGetSearchParams } from '@/hooks/links/use-get-search-params'
import { LinkShotenType } from '@/hooks/links/use-form-create-shorten'
import { NotificationService } from '../../user/notification/notification-service'
export function useEditShorten() {
  const { getToken } = useAuth()
  const { currentPage, filter, filterInput } = useGetSearchParams()
  const queryClient = useQueryClient()

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async (data: LinkShotenType) => {
      const token = await getToken()
      const Shorten = new ShortenService(token)
      return Shorten.editShorten({
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

          const exists = oldData.shortenedUrls.find((url) => url.id === data.id)

          let newShortenedUrls
          if (exists) {
            // Atualiza o item existente
            newShortenedUrls = oldData.shortenedUrls.map((url) => (url.id === data.id ? data : url))
          } else {
            // Adiciona novo
            newShortenedUrls = [...oldData.shortenedUrls, data]
          }

          return {
            ...oldData,
            shortenedUrls: newShortenedUrls,
            totalPages: oldData.totalPages ?? 1,
            totalItems: exists ? oldData.totalItems : oldData.totalItems + 1,
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

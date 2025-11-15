import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { IGetAllShortenResult } from '@/api/services/link/helpers/get-all-shorten'
import { ShortenService } from '@/api/services/link/Shorten-service'
import { useGetSearchParams } from '@/hooks/links/use-get-search-params'
import { NotificationService } from '../../user/notification/notification-service'
import { IDeleteShortenProps } from '../helpers/delete-shorten'

export function useDeleteShorten() {
  const { getToken } = useAuth()
  const { currentPage, filter, filterInput } = useGetSearchParams()
  const queryClient = useQueryClient()

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async ({ shortenedIuid, shortenedUrl }: IDeleteShortenProps) => {
      const token = await getToken()
      const shorten = new ShortenService(token)
      return shorten.deleteShortren({ shortenedIuid, shortenedUrl })
    },

    async onMutate(variables) {
      await queryClient.cancelQueries({
        queryKey: ['links', currentPage, filter, filterInput],
      })

      const previousData = queryClient.getQueryData<IGetAllShortenResult>([
        'links',
        currentPage,
        filter,
        filterInput,
      ])

      // Atualiza otimisticamente removendo o link deletado
      queryClient.setQueryData(
        ['links', currentPage, filter, filterInput],
        (oldData?: IGetAllShortenResult) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            shortenedUrls: oldData.shortenedUrls.filter(
              (item) => item.shortenedUrl !== variables.shortenedUrl,
            ),
            totalItems: Math.max(oldData.totalItems - 1, 0),
          }
        },
      )

      const token = await getToken()
      const notification = new NotificationService(token, queryClient)
      notification.notification.success(variables.shortenedUrl, 'delete')
      return { previousData }
    },

    onError: async (error, variables, context) => {
      const token = await getToken()
      const notification = new NotificationService(token)
      await notification.notification.error(variables.shortenedUrl, error.message)

      if (context?.previousData) {
        queryClient.setQueryData(['links', currentPage, filter, filterInput], context.previousData)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['links', currentPage, filter, filterInput],
      })
    },
  })

  const handleSubmitMutation = (data: IDeleteShortenProps) => {
    mutate({
      shortenedUrl: data.shortenedUrl,
      shortenedIuid: data.shortenedIuid,
    })
  }

  return {
    handleSubmitMutation,
    isError,
    isPending,
  }
}

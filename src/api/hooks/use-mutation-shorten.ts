import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LinkShotenType } from '../../hooks/links/use-form-new-link'
import { toast } from 'sonner'
import { useAuth } from '@clerk/nextjs'
import { IGetAllShortenResult } from '@/api/services/link/helpers/get-all-shorten'
import { ShortenService } from '@/api/services/link/Shorten-service'
import { useGetSearchParams } from '@/hooks/links/use-get-search-params'
export function useMutationShorten() {
  const { getToken } = useAuth()
  const { currentPage } = useGetSearchParams()
  const queryClient = useQueryClient()

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async (data: LinkShotenType) => {
      const token = await getToken()
      const Shorten = new ShortenService(token)
      return Shorten.createShortenLink({
        ...data,
      })
    },
    onSuccess(data) {
      toast.success('Link encurtado com sucesso!', {
        richColors: true,
        duration: 4000,
        action: {
          label: data.shortenedUrl,
          onClick: () => window.open(`http://localhost:8081/${data.shortenedUrl}`, '_blank'),
        },
      })

      queryClient.setQueryData(['links', currentPage], (oldData: IGetAllShortenResult) => {
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
      })
    },
    onError(error) {
      console.log(error)
      if (error instanceof Error) {
        toast.error(error.message, { duration: 4000, richColors: true })
      }
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

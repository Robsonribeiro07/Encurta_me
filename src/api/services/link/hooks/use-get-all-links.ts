import { ShortenService } from '@/api/services/link/Shorten-service'
import { useGetSearchParams } from '@/hooks/links/use-get-search-params'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

export function useGetAllLinks() {
  const { getToken } = useAuth()
  const { currentPage, filter, filterInput } = useGetSearchParams()

  const { data } = useQuery({
    queryKey: ['links', currentPage, filter, filterInput],
    queryFn: async () => {
      const token = await getToken()
      const Shorten = new ShortenService(token)
      return Shorten.getAllLinks(currentPage, filter, filterInput)
    },
  })

  return {
    links: data,
  }
}

import { filter } from '@/api/services/link/helpers/get-all-shorten'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useGetSearchParams() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || '1')
  const [filter, setFilter] = useState<filter>((searchParams.get('filter') as filter) || 'all')

  useEffect(() => {
    setCurrentPage(searchParams.get('page') || '1')
    setFilter((searchParams.get('filter') as filter) || 'all')
  }, [searchParams])

  const handlSetFilterParams = (newFilter: filter) => {
    setFilter(newFilter)

    const params = new URLSearchParams(window.location.search)
    params.set('filter', newFilter)
    return push(`?${params.toString()}`)
  }

  return {
    currentPage: Number(currentPage) || 1,
    filter,
    handlSetFilterParams,
  }
}

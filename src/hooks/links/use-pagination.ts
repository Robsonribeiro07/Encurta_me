'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { useGetSearchParams } from './use-get-search-params'
import { useGetAllLinks } from '@/api/services/link/hooks/use-get-all-links'

export function usePagination() {
  const searchParams = useSearchParams()
  const { currentPage } = useGetSearchParams()
  const { push } = useRouter()

  const { links } = useGetAllLinks()

  const { totalPages } = links || { totalPages: 1 }

  const { pages, hasNextPage, hasPreviousPage } = useMemo(() => {
    const pages: number[] = []
    const start = Math.max(1, currentPage ?? 1 - 2)
    const end = Math.min(totalPages, currentPage + 2)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return {
      pages,
      hasNextPage: (currentPage ?? 1) < totalPages,
      hasPreviousPage: (currentPage ?? 1) > 1,
    }
  }, [currentPage, totalPages])
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return push(`?${params.toString()}`, { scroll: false })
  }
  return {
    pages,
    goToPage,
    currentPage,
    hasPreviousPage,
    hasNextPage,
    totalPages,
  }
}

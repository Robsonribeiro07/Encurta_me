'use client'
import { useGetAllNotification } from '@/api/services/user/notification/hooks/use-get-all-notification'
import { usePaginationNotificationStore } from '@/store/notification/use-pagination-store'
import { useMemo } from 'react'

export function usePaginationNotifications() {
  const { currentPage, setCurrentPage } = usePaginationNotificationStore()

  const { notifications } = useGetAllNotification()

  const { totalPages } = notifications || { totalPages: 1 }

  const { pages, hasNextPage, hasPreviousPage } = useMemo(() => {
    const pages: number[] = []
    const start = Math.max(1, currentPage ?? 1 - 1)
    const end = Math.min(totalPages, currentPage + 1)

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
    setCurrentPage(page)
    return
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

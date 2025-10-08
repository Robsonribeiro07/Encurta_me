import { create } from 'zustand'

type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'all' | 'read' | 'unread'
interface IPaginationStore {
  currentPage: number
  totalPages: number
  filter: NotificationType
  limits?: number
  setLimits?: (limits: number) => void
  setFilter: (filter: NotificationType) => void
  setCurrentPage: (page: number) => void
  setTotalPages: (pages: number) => void
}

export const usePaginationNotificationStore = create<IPaginationStore>((set) => ({
  currentPage: 1,
  totalPages: 1,
  filter: 'all',
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
  setLimits: (limits) => set({ limits }),
  setFilter: (filter) => set({ filter }),
}))

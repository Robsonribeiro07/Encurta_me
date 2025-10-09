'use client'
import { filter } from '@/api/services/link/helpers/get-all-shorten'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'

export function useGetSearchParams() {
  const { push } = useRouter()
  const [currentPage, setCurrentPage] = useState('1')
  const [filter, setFilter] = useState<filter>('all')
  const [filterInput, setFilterInput] = useState('')

  // Função para atualizar os parâmetros da URL atual
  const updateFromURL = useCallback(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setCurrentPage(params.get('page') || '1')
      setFilter((params.get('filter') as filter) || 'all')
      setFilterInput(params.get('input') || '')
    }
  }, [])

  useEffect(() => {
    // Atualiza na primeira renderização
    updateFromURL()

    if (typeof window !== 'undefined') {
      let lastUrl = window.location.search

      // Verifica mudanças na URL a cada 100ms
      const checkUrlChange = () => {
        const currentUrl = window.location.search
        if (currentUrl !== lastUrl) {
          lastUrl = currentUrl
          updateFromURL()
        }
      }

      const interval = setInterval(checkUrlChange, 100)

      // Escuta mudanças na URL (back/forward)
      const handlePopState = () => {
        updateFromURL()
      }

      window.addEventListener('popstate', handlePopState)

      // Cleanup
      return () => {
        clearInterval(interval)
        window.removeEventListener('popstate', handlePopState)
      }
    }
  }, [updateFromURL])

  const handlSetFilterParams = useCallback(
    (newFilter: filter) => {
      setFilter(newFilter)

      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        params.set('filter', newFilter)
        const newUrl = `?${params.toString()}`

        // Atualiza apenas via router sem usar window.history
        push(newUrl)
      }
    },
    [push],
  )

  const handleSetFilterInputParams = useCallback(
    (newfilter: string) => {
      setFilterInput(newfilter)

      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        params.set('input', newfilter)
        const newUrl = `?${params.toString()}`

        push(newUrl)
      }
    },
    [push],
  )

  return {
    currentPage: Number(currentPage) || 1,
    filter,
    handlSetFilterParams,
    filterInput,
    handleSetFilterInputParams,
  }
}

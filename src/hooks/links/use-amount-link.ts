import { useGetAllLinks } from '@/api/services/link/hooks/use-get-all-links'
import { useMemo } from 'react'

interface IUseAmountLinkReturn {
  totalClicks: number
  totalLinks: number
  clickAverage: number
  conversionRate: number
}

export function useAmountLink() {
  const { links } = useGetAllLinks()

  const amount = useMemo<IUseAmountLinkReturn>(() => {
    if (!links || links.shortenedUrls.length === 0) {
      return {
        totalClicks: 0,
        totalLinks: 0,
        clickAverage: 0,
        conversionRate: 0,
      }
    }

    const result = links.shortenedUrls.reduce<IUseAmountLinkReturn>(
      (acc, curr) => {
        acc.totalClicks += curr.clicks || 0
        acc.totalLinks += 1
        return acc
      },
      {
        totalClicks: 0,
        totalLinks: 0,
        clickAverage: 0,
        conversionRate: 0,
      },
    )

    result.clickAverage = Math.ceil(
      result.totalLinks > 0 ? result.totalClicks / result.totalLinks : 0,
    )
    result.conversionRate =
      result.totalLinks > 0 ? Math.ceil(result.totalClicks / result.totalLinks) * 100 : 0

    return result
  }, [links])

  return amount
}

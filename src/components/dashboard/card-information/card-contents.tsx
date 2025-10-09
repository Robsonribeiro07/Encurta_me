import { useAmountLink } from '@/hooks/links/use-amount-link'
import { CardInformation } from './card'
import { useGetAllLinks } from '@/api/services/link/hooks/use-get-all-links'

export function CardContents() {
  const { clickAverage, conversionRate } = useAmountLink()
  const { links } = useGetAllLinks()

  return (
    <div className="flex flex-col mt-10 lg:grid xl:grid-cols-4 gap-10 z-10 ">
      <CardInformation type="links" number={links?.totalItems ?? 0} />
      <CardInformation type="amount" number={links?.totalClicks ?? 0} />
      <CardInformation type="click-average" number={clickAverage} />
      <CardInformation type="conversion-rate" number={conversionRate} />
    </div>
  )
}

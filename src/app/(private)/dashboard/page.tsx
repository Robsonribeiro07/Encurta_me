'use client'
import { CardInformation } from '@/components/dashboard/card-information/card-'
import { CardContents } from '@/components/dashboard/card-information/card-contents'
import LinkAnimation from '@/components/dashboard/link-animation'
import { CreateNewLink } from '@/components/dashboard/links/create-new-link'
import { useGetAllLinks } from '@/api/hooks/use-get-all-links'
import { useAuth } from '@clerk/nextjs'
import { RecentsContentCard } from '@/components/dashboard/Recents-links/recents-content'
import { useGetAllNotification } from '@/api/services/user/notification/hooks/use-get-all-notification'

export default function Dashboard() {
  const { links } = useGetAllLinks()
  const { notifications } = useGetAllNotification()

  console.log(notifications)
  return (
    <div className="lflex flex-1 flex-col p-8">
      <CreateNewLink />
      <CardContents />
      <RecentsContentCard />

      <LinkAnimation url="https://prod.spline.design/wv0sXCxwKzzbLGgJ/scene.splinecode" />
    </div>
  )
}

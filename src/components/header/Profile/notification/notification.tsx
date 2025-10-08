'use client'
import { IGetAllShortenResult } from '@/api/services/link/helpers/get-all-shorten'
import { IGetAllNotificationResult } from '@/api/services/user/notification/helpers/get-all-notification'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { isValidUrl } from '@/utils/valid-url'
import { Verified } from 'lucide-react'
import Link from 'next/link'
import { IndicatorType } from './indicator-type'

const ACTIONS_NOTIFICATION = [
  {
    title: 'ver link',
    onClick: () => {},
  },
  {
    title: 'mark as read',
    onClick: () => {},
  },
] as const

export function NotificationItem({ title, message, link, type }: IGetAllNotificationResult) {
  return (
    <DropdownMenuItem className="flex flex-col items-start bg-secondary/70 ">
      <div className="flex flex-row gap-4">
        <IndicatorType type={type} />

        <div className="text-card-foreground">
          <h1 className="">{title}!</h1>
          <p className="text-[0.750rem] opacity-70 ">{message}</p>
        </div>
      </div>

      <div className="items-center flex gap-3 self-start">
        {ACTIONS_NOTIFICATION.map((action) => {
          if (action.title === 'ver link' && (!link || !isValidUrl(link))) return null

          return link && action.title === 'ver link' ? (
            <Link
              key={action.title}
              href={link}
              target="_blank"
              className="text-sm text-purple-400 hover:underline"
            >
              {action.title}
            </Link>
          ) : (
            <Button
              key={action.title}
              variant="outline"
              className="text-[0.750rem]  opacity-70"
              onClick={action.onClick}
            >
              {action.title}
            </Button>
          )
        })}
      </div>
    </DropdownMenuItem>
  )
}

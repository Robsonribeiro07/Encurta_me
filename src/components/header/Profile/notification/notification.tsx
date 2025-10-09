'use client'
import { IGetAllNotificationResult } from '@/api/services/user/notification/helpers/get-all-notification'
import { Button } from '@/components/ui/button'
import { isValidUrl } from '@/utils/valid-url'
import Link from 'next/link'
import { IndicatorType } from './indicator-type'
import { useMarkAsRead } from '@/api/services/user/notification/hooks/use-mark-as-read'

export function NotificationItem({
  title,
  message,
  link,
  type,
  _id,
  read,
}: IGetAllNotificationResult) {
  const { handleMarkAsRead, isPending } = useMarkAsRead()

  console.log(type)

  return (
    <div className="flex flex-col gap-2 bg-secondary/70 p-3 rounded">
      <div className="flex flex-row gap-4">
        <IndicatorType type={type} />

        <div className="text-card-foreground">
          <h1>{title}!</h1>
          <p className="text-[0.750rem] opacity-70">{message}</p>
        </div>
      </div>

      <div className="flex gap-3 mt-2 items-center">
        {link && isValidUrl(link) && (
          <Link href={link} target="_blank" className="text-sm text-purple-400 hover:underline">
            ver link
          </Link>
        )}
        {!read && (
          <Button
            variant="outline"
            className="text-[0.750rem] opacity-70"
            onClick={() => handleMarkAsRead(_id)}
            disabled={isPending}
          >
            mark as read
          </Button>
        )}
      </div>
    </div>
  )
}

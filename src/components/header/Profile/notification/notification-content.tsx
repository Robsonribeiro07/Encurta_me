'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { Bell } from 'lucide-react'
import { NotificationItem } from './notification'
import { PaginationLinks } from './pagination'
import { useGetAllNotification } from '@/api/services/user/notification/hooks/use-get-all-notification'
import { SelectFilterNotification } from './select-filter'

export function NotificationContent() {
  const { notifications } = useGetAllNotification()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Bell />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-72 min-w-fit mt-2 h-fit flex flex-col p-4 mr-10 gap-3"
        side="bottom"
      >
        <DropdownMenuLabel className="flex flex-row justify-between items-center">
          Notificaçoes
          <SelectFilterNotification />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications?.notifications?.map((notification) => (
          <NotificationItem key={notification._id} {...notification} />
        ))}
        <PaginationLinks />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

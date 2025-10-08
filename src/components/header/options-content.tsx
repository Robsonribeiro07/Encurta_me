import { Bell, Settings } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { UserButton } from '@clerk/nextjs'
import { NotificationContent } from './Profile/notification/notification-content'

export function OptionsContent() {
  return (
    <div className="flex flex-row gap-2  max-sm:sr-only">
      <Input
        className="bg-sidebar placeholder:text-sidebar-primary"
        placeholder=" Pesquisa por links"
      />
      <div className="flex flex-row gap-2 max-sm:sr-only">
        <NotificationContent />
        <Button>
          <Settings />
        </Button>
      </div>
      <UserButton />
    </div>
  )
}

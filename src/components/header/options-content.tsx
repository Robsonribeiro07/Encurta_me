'use client'
import { Settings } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { UserButton } from '@clerk/nextjs'
import { NotificationContent } from './Profile/notification/notification-content'
import { useGetSearchParams } from '@/hooks/links/use-get-search-params'

export function OptionsContent() {
  const { handleSetFilterInputParams, filterInput } = useGetSearchParams()
  return (
    <div className="flex flex-row gap-2  ">
      <Input
        value={filterInput}
        className="bg-sidebar placeholder:text-sidebar-primary  max-sm:sr-only"
        placeholder=" Pesquisa por links"
        onChange={(e) => handleSetFilterInputParams(e.target.value)}
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

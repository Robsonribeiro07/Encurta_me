import { Button } from '@/components/ui/button'
import { Link2 } from 'lucide-react'
import { SelectFilter } from './select-filter'

export function Header() {
  return (
    <header className="w-full flex justify-between">
      <div className="flex items-center gap-3">
        <Link2 color="var(--purple-500)" size={30} />
        <h1 className="text-xl  font-semibold ">Links Recentes</h1>
      </div>

      <SelectFilter />
    </header>
  )
}

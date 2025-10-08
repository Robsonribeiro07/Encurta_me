import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Eye } from 'lucide-react'

export function LoadingTable() {
  return (
    <TableBody>
      {Array.from({ length: 6 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="min-w-[8.5rem]">
            <Skeleton className="w-full bg-card-foreground h-6" />
          </TableCell>
          <TableCell className="text-purple-50 w-48">
            <Skeleton className="w-full bg-card-foreground h-6" />
          </TableCell>
          <TableCell className="w-48 ">
            <Skeleton className="w-full bg-card-foreground h-6" />
          </TableCell>

          <TableCell className="flex flex-row items-center gap-3 opacity-[0.7 ]">
            <Eye size={15} color="var(--primary)" />
            <Skeleton className="w-8 bg-card-foreground h-6" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

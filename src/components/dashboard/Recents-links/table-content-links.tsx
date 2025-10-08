import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LinkContent } from './link-content'
import { PaginationLinks } from './pagination'

const OPTIONS_HEADER = [
  'Links Original',
  'Links Encurtados',
  'Criado em',
  'Cliques',
  'Status',
  'Ações',
]
export function TableContentLinks() {
  return (
    <>
      <Table className="flex-1 mt-5">
        <TableHeader>
          <TableRow className="text-primary-foreground">
            {OPTIONS_HEADER.map((option) => (
              <TableHead key={option} className="text-left text-primary/70 ">
                {option}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <LinkContent />
      </Table>
      <PaginationLinks />
    </>
  )
}

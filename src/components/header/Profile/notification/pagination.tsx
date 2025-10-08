import { useGetAllLinks } from '@/api/hooks/use-get-all-links'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { usePagination } from '@/hooks/links/use-pagination'
import { usePaginationNotifications } from '@/hooks/user/notification/use-pagination'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

export function PaginationLinks() {
  const { pages, currentPage, hasNextPage, hasPreviousPage, goToPage, totalPages } =
    usePaginationNotifications()
  return (
    <Pagination className=" justify-end px-4">
      <PaginationContent>
        <PaginationItem>
          <ChevronsLeft onClick={() => hasPreviousPage && goToPage(1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious onClick={() => hasPreviousPage && goToPage(currentPage - 1)} />
        </PaginationItem>
        {pages?.map((page) => (
          <PaginationItem key={page} onClick={() => goToPage(page)}>
            <PaginationLink isActive={page === currentPage}> {page}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => hasNextPage && goToPage(currentPage + 1)} />
        </PaginationItem>

        <PaginationItem>
          <ChevronsRight onClick={() => hasNextPage && goToPage(totalPages)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

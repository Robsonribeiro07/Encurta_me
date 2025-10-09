import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Eye } from 'lucide-react'
import { LoadingTable } from './loading-table'
import { StatusLink } from './status-link'
import { toast } from 'sonner'
import { CoppyButton } from '@/components/coppy-button'
import { Actions } from './actions'
import { useGetAllLinks } from '@/api/services/link/hooks/use-get-all-links'
import { getUrlBackend } from '@/utils/get-url-backend'
export function LinkContent() {
  const { links } = useGetAllLinks()

  return links ? (
    <TableBody>
      {links.shortenedUrls?.map((link) => (
        <TableRow key={link.id}>
          <TableCell className="max-w-[8rem]">
            <div className="flex items-center gap-2 relative">
              {link.originalUrl.slice(0, 35)}...
              <CoppyButton text={link.originalUrl} />
            </div>
          </TableCell>
          <TableCell
            onClick={() => {
              if (link.status !== 'active') {
                toast.info(link.status, { richColors: true })
              }
            }}
            className={`${
              link.status === 'active' ? 'text-purple-500 underline' : 'text-purple-800'
            } w-48 `}
          >
            {link.status === 'active' ? (
              <div className="flex items-center gap-2 relative">
                <Link
                  href={`${getUrlBackend()}/${link.shortenedUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.shortenedUrl}
                </Link>
                <CoppyButton text={`${getUrlBackend()}/${link.shortenedUrl}`} />
              </div>
            ) : (
              link.shortenedUrl
            )}
          </TableCell>
          <TableCell className="w-48">
            {formatDistanceToNow(new Date(link.createdAt!), {
              addSuffix: true,

              locale: ptBR,
            })}
          </TableCell>

          <TableCell className="flex flex-row items-center gap-3 opacity-[0.7]">
            <Eye size={15} color="var(--primary)" />
            {link.clicks}
          </TableCell>

          <TableCell>
            <StatusLink status={link.status} />
          </TableCell>

          <Actions />
        </TableRow>
      ))}
    </TableBody>
  ) : (
    <LoadingTable />
  )
}

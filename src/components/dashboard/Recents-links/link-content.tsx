import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Copy, Eye } from 'lucide-react'
import { LoadingTable } from './loading-table'
import { StatusLink } from './status-link'
import { toast } from 'sonner'
import { Actions } from './actions'
import { useGetAllLinks } from '@/api/services/link/hooks/use-get-all-links'
import { getUrlBackend } from '@/utils/get-url-backend'
import { useCopyToClipboard } from '@/components/coppy-button'

export function LinkContent() {
  const { links, isFetched } = useGetAllLinks()
  const { copy } = useCopyToClipboard()

  // Se ainda estiver carregando
  if (!isFetched) {
    return <LoadingTable />
  }

  // Se não tiver nenhum link
  if (!links?.shortenedUrls?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6} className="text-center text-gray-500 py-6">
            Nenhum link encontrado
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  // Se houver links
  return (
    <TableBody>
      {links.shortenedUrls.map((link) => (
        <TableRow key={link.id}>
          {/* URL original */}
          <TableCell className="flex flex-1 w-full max-w-[30rem]">
            <div className="flex items-center gap-2">
              {link.originalUrl.slice(0, 50)}...
              <Copy
                onClick={() => {
                  copy(link.originalUrl)
                  toast.success('URL copiada com sucesso!')
                }}
                className="cursor-pointer hover:opacity-80"
              />
            </div>
          </TableCell>

          {/* URL encurtada */}
          <TableCell
            className={`w-48 ${
              link.status === 'active' ? 'text-purple-500 underline' : 'text-purple-800'
            }`}
          >
            {link.status === 'active' ? (
              <div className="flex items-center gap-2">
                <Link
                  href={`${getUrlBackend()}/${link.shortenedUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.shortenedUrl}
                </Link>
                <Copy
                  onClick={() => {
                    copy(`${getUrlBackend()}/${link.shortenedUrl}`)
                    toast.success('Link encurtado copiado!')
                  }}
                  className="cursor-pointer hover:opacity-80"
                />
              </div>
            ) : (
              link.shortenedUrl
            )}
          </TableCell>

          {/* Data de criação */}
          <TableCell className="w-48">
            {formatDistanceToNow(new Date(link.createdAt!), {
              addSuffix: true,
              locale: ptBR,
            })}
          </TableCell>

          {/* Cliques */}
          <TableCell className="flex flex-row items-center gap-3 opacity-70">
            <Eye size={15} color="var(--primary)" />
            {link.clicks}
          </TableCell>

          {/* Status */}
          <TableCell>
            <StatusLink status={link.status} />
          </TableCell>

          {/* Ações */}
          <Actions links={link} />
        </TableRow>
      ))}
    </TableBody>
  )
}

import { TableCell } from '@/components/ui/table'
import { Copy, CopyPlus, Edit, Trash } from 'lucide-react'
import { EditLink } from '../behaviors/edit-link'
import {
  IGetAllShortenResult,
  IShortenedUrlResponse,
} from '@/api/services/link/helpers/get-all-shorten'
import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/components/coppy-button'
import { DeleteShorten } from '../behaviors/delete'

const ACTIONS_BEHAVIOR = [
  {
    name: 'copy',
    icon: <Copy />,
  },
  {
    name: 'edit',
    icon: <Edit />,
    Component: EditLink,
  },
  {
    name: 'delete',
    icon: <Trash />,
    Component: DeleteShorten,
  },
] as const

export function Actions({ links }: { links: IShortenedUrlResponse }) {
  const { copy } = useCopyToClipboard()
  return (
    <TableCell className="w-48 flex gap-2">
      {ACTIONS_BEHAVIOR.map((action, index) => {
        if (action.name === 'copy') {
          return (
            <Button onClick={() => copy(links.originalUrl)} key={index}>
              <CopyPlus />
            </Button>
          )
        }

        const EditComponent = action.Component as React.FC<{ link: IShortenedUrlResponse }>
        return <EditComponent key={index} link={links} />
      })}
    </TableCell>
  )
}

import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { Copy, Edit, Trash } from 'lucide-react'

const ACTIONS_BEHAVIOR = [
  {
    name: 'copy',
    icon: <Copy />,
    onClick: () => {
      console.log('Copy clicked')
    },
  },

  {
    name: 'edit',
    icon: <Edit />,
    onClick: () => {
      console.log('Edit clicked')
    },
  },
  {
    name: 'delete',
    icon: <Trash />,
    onClick: () => {
      console.log('Delete clicked')
    },
  },
] as const
export function Actions() {
  return (
    <TableCell className="w-48 ">
      {ACTIONS_BEHAVIOR.map((action, index) => (
        <Button className="mx-1" key={index} onClick={action.onClick}>
          {action.icon}
        </Button>
      ))}
    </TableCell>
  )
}

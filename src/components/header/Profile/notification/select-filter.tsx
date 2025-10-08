import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePaginationNotificationStore } from '@/store/notification/use-pagination-store'

const SELECT_OPTIONS = [
  { value: 'all', label: 'Todos', color: 'text-blue-500' },

  { value: 'info', label: 'Informaçoes', color: 'text-purple-500' },
  { value: 'success', label: 'Sucesso', color: 'text-green-500' },
  { value: 'warning', label: 'Aviso', color: 'text-yellow-500' },
  { value: 'error', label: 'Error', color: 'text-red-500' },
  { value: 'read', label: 'Lidas', color: 'text-gray-500' },
  { value: 'unread', label: 'Não Lidas', color: 'text-gray-500' },
] as const

export function SelectFilterNotification() {
  const { filter, setFilter } = usePaginationNotificationStore()

  return (
    <Select
      value={filter}
      onValueChange={(value) => setFilter(value as (typeof SELECT_OPTIONS)[number]['value'])}
    >
      <SelectTrigger>
        <SelectValue placeholder={filter} />
      </SelectTrigger>

      <SelectContent>
        {SELECT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="flex items-center">
            <span>{option.label}</span>
            <span className={`${option.color} ml-auto`}>●</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

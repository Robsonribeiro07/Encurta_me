import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetSearchParams } from '@/hooks/links/use-get-search-params'

const SELECT_OPTIONS = [
  { value: 'all', label: 'Todos', color: 'text-purple-500' },
  { value: 'active', label: 'Ativos', color: 'text-green-500' },
  { value: 'pending', label: 'Pendentes', color: 'text-yellow-500' },
  { value: 'expired', label: 'Expirados', color: 'text-red-500' },
  { value: 'inactive', label: 'Inativos', color: 'text-gray-500' },
] as const

export function SelectFilter() {
  const { filter, handlSetFilterParams } = useGetSearchParams()

  return (
    <Select
      value={filter}
      onValueChange={(value) =>
        handlSetFilterParams(value as (typeof SELECT_OPTIONS)[number]['value'])
      }
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

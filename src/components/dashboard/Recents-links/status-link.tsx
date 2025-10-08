const STATUS_MAP = {
  active: { label: 'active', bgcolor: 'bg-green-900', color: 'text-green-500' },
  inactive: { label: 'inactive', bgcolor: 'bg-red-900', color: 'text-red-500' },
  pending: { label: 'pending', bgcolor: 'bg-yellow-900', color: 'text-yellow-500' },
  expired: { label: 'expired', bgcolor: 'bg-gray-900', color: 'text-gray-500' },
}

interface StatusLinkProps {
  status: keyof typeof STATUS_MAP
}
export function StatusLink({ status }: StatusLinkProps) {
  const { label, color, bgcolor } = STATUS_MAP[status]

  return <p className={`${bgcolor} ${color} w-fit p-2 rounded-md`}>{label}</p>
}

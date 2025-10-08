import { Verified } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
type IndicatorType = 'info' | 'success' | 'warning' | 'error'

type IndicatorTypeResponse = {
  icon: LucideIcons.LucideIcon
  bgColor: string
  iconBgColor: string
}
const INDICATOR_TYPE: Record<IndicatorType, IndicatorTypeResponse> = {
  info: {
    icon: LucideIcons.Info,
    bgColor: 'bg-blue-800',
    iconBgColor: 'bg-blue-500',
  },
  success: {
    icon: LucideIcons.CheckCircle,
    bgColor: 'bg-green-800',
    iconBgColor: 'bg-green-500',
  },
  warning: {
    icon: LucideIcons.AlertTriangle,
    bgColor: 'bg-yellow-800',
    iconBgColor: 'bg-yellow-500',
  },
  error: {
    icon: LucideIcons.XCircle,
    bgColor: 'bg-red-800',
    iconBgColor: 'bg-red-500',
  },
}
interface IIndicatorTypeProps {
  type?: IndicatorType
}

export function IndicatorType({ type }: IIndicatorTypeProps) {
  const { icon: Icon, bgColor, iconBgColor } = INDICATOR_TYPE[type || 'info']

  return (
    <span className={`${bgColor} p-2 h-fit rounded-full`}>
      <Icon className={`${iconBgColor} rounded-full`} color="#fff" />
    </span>
  )
}

import * as LudiceIcons from 'lucide-react'

export function IconComponent({
  iconName,
  color,
}: {
  iconName: keyof typeof LudiceIcons
  color?: string
}) {
  const Icon = LudiceIcons[iconName] as React.FC<React.SVGProps<SVGSVGElement>>
  return <Icon style={{ color }} />
}

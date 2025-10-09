import { IconComponent } from '@/components/ui/icon-component'
import * as LudiceIcons from 'lucide-react'
interface ICardInformationProps {
  number: number
  type: 'links' | 'amount' | 'click-average' | 'conversion-rate'
}
interface ICardInformationRequired {
  title: string
  Icon: keyof typeof LudiceIcons
  color: string
  foreroundColor?: string
}

const MAP_TYPE_TO_LABEL: Record<ICardInformationProps['type'], ICardInformationRequired> = {
  links: {
    title: 'Total de links',
    Icon: 'Link',
    color: 'bg-purple-100',
    foreroundColor: 'var(--purple-700)',
  },
  amount: {
    title: 'Total de clicks',
    Icon: 'Eye',
    color: 'bg-blue-200',
    foreroundColor: 'var(--purple-700)',
  },
  'click-average': {
    title: 'Média de cliques',
    Icon: 'MousePointer',
    color: 'bg-green-100',
    foreroundColor: 'var(--purple-700)',
  },
  'conversion-rate': {
    title: 'Taxa de conversão',
    Icon: 'BarChart2',
    color: 'bg-yellow-100',
    foreroundColor: 'var(--purple-700)',
  },
}
export function CardInformation({ number, type }: ICardInformationProps) {
  const { title, Icon, color, foreroundColor } = MAP_TYPE_TO_LABEL[type]

  return (
    <div className="flex w-full flex-1 min-h-[7.2rem] md:h-[7rem] bg-card rounded-xl items-center justify-start px-4 gap-5 hover:scale-105 duration-100 ease-in-out shadow-lg shadow-purple-500">
      <div className={`p-5 rounded-lg ${color}`}>
        <IconComponent iconName={Icon} color={foreroundColor} />
      </div>

      <div>
        <h2 className="font-semibold text-2xl">
          {number}
          {type === 'conversion-rate' && '%'}
        </h2>
        <p className="text-primary/60">{title}</p>

        <p className="text-emerald-400">12% este mês</p>
      </div>
    </div>
  )
}

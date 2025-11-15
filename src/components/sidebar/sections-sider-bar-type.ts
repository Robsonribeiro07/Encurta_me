import * as LudiceIcons from 'lucide-react'

interface SiderBartype {
  Icon: keyof typeof LudiceIcons
  name: string
  href: string
}

export const sideBarContent: SiderBartype[] = [
  {
    Icon: 'LucideLayoutDashboard',
    name: 'Dashboard',
    href: '/dashboard',
  },
  /*  {
    Icon: 'Link',
    name: 'Meus Links',
    href: '/links',
  },
  {
    Icon: 'LineChart',
    name: 'Estatísticas',
    href: '/statistics',
  },
  {
    Icon: 'QrCodeIcon',
    name: 'QR Code',
    href: '/api-docs',
  },
  {
    Icon: 'HelpCircle',
    name: 'Ajuda',
    href: '/help',
  },*/
]

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import * as LucideIcons from 'lucide-react'
import { IconComponent } from '../ui/icon-component'

interface INavLinkProps {
  href: string
  label: string
  Icon: keyof typeof LucideIcons
}

export function NavLink({ href, label, Icon }: INavLinkProps) {
  const pathname = usePathname()
  const isRoute = pathname === href

  return (
    <Link href={href} className="w-full">
      <Button
        variant="ghost"
        className={`w-full flex items-center justify-start py-6 px-4 rounded-lg transition-colors duration-200 ${
          isRoute
            ? 'bg-sidebar-accent-foreground text-sidebar-accent'
            : 'text-sidebar-primary hover:bg-sidebar-foreground/30 dark:hover:bg-sidebar-foreground/50'
        }`}
      >
        <IconComponent iconName={Icon} />
        <span className="ml-3 text-lg font-medium tracking-wider">{label}</span>
      </Button>
    </Link>
  )
}

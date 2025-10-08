'use client'
import { NavLink } from './nav-link.'
import { sideBarContent } from './sections-sider-bar-type'

export function NavContent() {
  return (
    <div className="w-[15rem] h-full bg-sidebar max-sm:sr-only flex flex-col">
      <nav className="flex-1 px-4 py-7 flex gap-3 flex-col">
        {sideBarContent.map((section) => (
          <NavLink
            key={section.name}
            href={section.href}
            label={section.name}
            Icon={section.Icon}
          />
        ))}
      </nav>
    </div>
  )
}

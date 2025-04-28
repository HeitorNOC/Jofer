"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export type NavLinkProps = {
  href: string
  className?: string
  activeClassName?: string
  children: ReactNode
}

export function NavLink({
  href,
  className = '',
  activeClassName = 'text-foreground',
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  const linkClassName = [
    'flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground',
    className,
    isActive ? activeClassName : ''
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Link href={href} className={linkClassName} {...props}>
      {children}
    </Link>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccountMenu } from "@/components/account-menu"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavLink } from "@/components/nav-link"

export function Navbar() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { title: "Início", href: "/" },
    { title: "Cordéis", href: "/cordeis" },
    { title: "Livros", href: "/livros" },
    { title: "Palestras", href: "/palestras" },
    { title: "Contato", href: "/contato" },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur bg-white/60 dark:bg-black/60 border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-foreground">
          João Ferreira
        </Link>

        <ul className="hidden md:flex items-center space-x-6 ml-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-4 hidden md:flex">
          <div className="flex items-center justify-center w-10 h-10">
            <ThemeToggle />
          </div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[280px] p-6">
            <div className="space-y-6">
              {navItems.map((item) => (
                <div key={item.href} onClick={() => setOpen(false)}>
                  <NavLink href={item.href} className="text-lg block">
                    {item.title}
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <AccountMenu />
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

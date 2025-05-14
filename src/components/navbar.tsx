"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "@/components/nav-link";
import { gsap } from "gsap";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const navItems = [
    { title: "Início", href: "/" },
    { title: "Cordéis", href: "/cordeis" },
    { title: "Livros", href: "/livros" },
    { title: "Palestras", href: "/palestras" },
    { title: "Contato", href: "/contato" },
  ];

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.set(headerRef.current, { autoAlpha: 0 });
    gsap.to(headerRef.current, { autoAlpha: 1, duration: 0.5 });
    gsap.set(itemRefs.current, { autoAlpha: 0, y: -20 });
    gsap.to(itemRefs.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power1.out",
      stagger: 0.1,
      delay: 0.6,
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className="opacity-0 fixed inset-x-0 top-0 z-50 backdrop-blur bg-white/60 dark:bg-black/60 border-b border-gray-200 dark:border-gray-800"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-foreground">
          João Ferreira
        </Link>
        <ul className="hidden md:flex items-center space-x-6 ml-10">
          {navItems.map((item, i) => (
            <li
              key={item.href}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
            >
              <NavLink href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-4 hidden md:flex">
          <ThemeToggle />
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
            <div className="mt-6 flex flex-col gap-4">
              <AccountMenu />
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

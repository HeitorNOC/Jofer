"use client";

// import { AccountMenu } from "@/components/account-menu"; // Será implementado na segunda versão
import { NavLink } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const pathname = usePathname();

  const navItems = [
    { title: "Início", href: "/" },
    { title: "Cordéis", href: "/cordeis" },
    { title: "Livro", href: "/livro" },
    /* { title: "Palestras", href: "/palestras" }, */
    { title: "Contato", href: "/contato" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial animation
  useEffect(() => {
    if (!headerRef.current) return;

    gsap.set(headerRef.current, { autoAlpha: 0 });
    gsap.to(headerRef.current, {
      autoAlpha: 1,
      duration: 0.5,
      ease: "power2.out"
    });

    gsap.set(itemRefs.current, { autoAlpha: 0, y: -20 });
    gsap.to(itemRefs.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.3,
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-2"
          : "bg-white/60 dark:bg-black/60 backdrop-blur py-4"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-foreground transition-transform hover:scale-105"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-blue-400">
            João Ferreira
          </span>
        </Link>

        <ul className="hidden md:flex items-center space-x-8 ml-10">
          {navItems.map((item, i) => (
            <li
              key={item.href}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="relative"
            >
              <NavLink
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-primary",
                  pathname === item.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-4 hidden md:flex">
          {/* <AccountMenu /> */}
          <ThemeToggle />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-6 border-l border-gray-200 dark:border-gray-800">
            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
            <div className="flex flex-col space-y-6 mt-8">
              {navItems.map((item) => (
                <div key={item.href} onClick={() => setOpen(false)}>
                  <NavLink
                    href={item.href}
                    className={cn(
                      "text-lg block transition-colors hover:text-primary py-2",
                      pathname === item.href
                        ? "text-primary font-medium"
                        : "text-foreground"
                    )}
                  >
                    {item.title}
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4">
              {/* <AccountMenu /> */}
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

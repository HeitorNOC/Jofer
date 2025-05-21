import { cn } from '@/lib/utils'
import { Book, BookOpen, Home, MessageCircle } from 'lucide-react'
import Link from 'next/link'
// import { AccountMenu } from './account-menu' // Será implementado na segunda versão
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <div className={cn("border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm", className)}>
      <div className="flex h-16 items-center gap-6 px-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-blue-400">
            JF
          </span>
        </Link>

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Home className="h-4 w-4 mr-1" />
            Início
          </NavLink>
          <NavLink href="/cordeis" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Book className="h-4 w-4 mr-1" />
            Cordéis
          </NavLink>
          <NavLink href="/livro" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <BookOpen className="h-4 w-4 mr-1" />
            Livro
          </NavLink>
          <NavLink href="/contato" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4 mr-1" />
            Contato
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          {/* <AccountMenu /> */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

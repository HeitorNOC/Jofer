"use client"

import { ChevronDown, LogIn, LogOut, Settings, UserCircle } from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export function AccountMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  async function handleSignOut() {
    const data = await signOut({ redirect: false, callbackUrl: '/sign-in' });
    router.push(data.url);
  }

  async function handleSignIn() {
    await signIn(undefined, { callbackUrl: '/' });
  }

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!session?.user?.name) return 'JF';
    return session.user.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" className="gap-2 h-9 px-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </Button>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleSignIn}
        className="gap-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <LogIn className="h-4 w-4" />
        Entrar
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex select-none items-center gap-2 h-9 px-2 hover:bg-accent"
        >
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage
              src={session?.user?.image || ''}
              alt={session?.user?.name || 'Avatar'}
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left">
            <span className="text-sm font-medium leading-none">
              {session?.user?.name?.split(' ')[0] || 'Usuário'}
            </span>
            <span className="text-xs text-muted-foreground leading-none mt-1">
              {session?.user?.email || ''}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center py-2 hover:bg-accent"
          onClick={() => router.push('/profile')}
        >
          <UserCircle className="mr-2 h-4 w-4" />
          <span>Meu Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center py-2 hover:bg-accent"
          onClick={() => router.push('/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

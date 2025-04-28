"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Building, ChevronDown, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

export function AccountMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();

  /*   const { data: profile, isLoading: isLoadingProfile } = useQuery({
      queryKey: ['profile'],
      //queryFn: getProfile, 
      enabled: !!session 
    }); */

  async function handleSignOut() {
    const data = await signOut({ redirect: false, callbackUrl: '/sign-in' });
    router.push(data.url);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {session ? session?.user?.name : 'Loading...'}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {/* {isLoadingProfile ? (
            'Carregando perfil...'
          ) : (
            <>
              <span>{profile?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {profile?.email}
              </span>
            </>
          )} */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button onClick={() => router.push('/profile')}>
            <Building className="mr-2 h-4 w-4" />
            Perfil da loja
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="text-rose-500 dark:text-rose-400"
        >
          <Button className="w-full" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

'use client'

import Image from 'next/image'
import { signIn, useSession, signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import {
  HeartIcon,
  HomeIcon,
  Loader2,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from 'lucide-react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { useState } from 'react'

const Header = () => {
  const { data } = useSession()
  const [isSignOutLoading, setIsSignOutLoading] = useState(false)

  const handleSignOutClick = async () => {
    setIsSignOutLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSignOutLoading(false)
    }
  }
  const handleSignInClick = () => signIn()

  return (
    <header className="flex justify-between">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="Logo da iaFood"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0">
          <SheetHeader className="p-5 text-left">
            <SheetTitle>Menu</SheetTitle>
            <div className="flex items-center justify-between pt-9">
              <SheetTitle className="text-base">
                {data?.user ? (
                  <div className="flex items-center gap-3 ">
                    <Avatar>
                      <AvatarImage src={data.user.image ?? ''} />
                      <AvatarFallback>
                        {data.user.name?.split(' ')[0][1]}
                        {data.user.name?.split(' ')[0][0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h2 className="text-sm font-bold capitalize">
                        {data.user.name}
                      </h2>
                      <span className="block text-xs text-muted-foreground">
                        {data.user.email}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span>Olá, Faça o seu login!</span>
                )}
              </SheetTitle>
              {data?.user ? (
                ''
              ) : (
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon size={20} />
                </Button>
              )}
            </div>
          </SheetHeader>

          <div className="px-5 py-6">
            <Separator />
          </div>

          <div className="space-y-2 px-5">
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start space-x-3 py-6 text-sm font-normal hover:bg-primary hover:text-white "
            >
              <Link href="/">
                <HomeIcon size={16} className="ml-2" />
                <span className="block">Início</span>
              </Link>
            </Button>
            {data?.user && (
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start space-x-3 py-6 text-sm font-normal hover:bg-primary hover:text-white "
                >
                  <Link href="/my-orders">
                    <HomeIcon size={16} className="ml-2" />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 py-6 text-sm font-normal hover:bg-primary hover:text-white "
                >
                  <HeartIcon size={16} className="ml-2" />
                  <span className="block">Restaurantes Favoritos</span>
                </Button>
              </div>
            )}
          </div>
          <div className="px-5 py-6">
            <Separator />
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="px-5">
                {data?.user && (
                  <Button
                    disabled={isSignOutLoading}
                    variant="ghost"
                    className="w-full justify-start space-x-3 py-6 text-sm font-normal hover:bg-primary hover:text-white "
                  >
                    {isSignOutLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <LogOutIcon size={16} className="ml-2" />
                    <span className="block">Sair</span>
                  </Button>
                )}
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90%] rounded-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Sair da conta</AlertDialogTitle>
                <AlertDialogDescription>
                  Deseja mesmo sair da plataforma?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row gap-3">
                <AlertDialogCancel className="mt-0 w-full">
                  Não
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSignOutClick}
                  className="w-full"
                  disabled={isSignOutLoading}
                >
                  {isSignOutLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sim
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Header

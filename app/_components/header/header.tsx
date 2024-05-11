import Image from 'next/image'
import { Button } from '../ui/button'
import {
  Heart,
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollText,
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

const Header = () => {
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
                Olá, Faça o seu login!
              </SheetTitle>
              <Button size="icon">
                <LogInIcon size={20} />
              </Button>
            </div>
          </SheetHeader>

          <div className="px-5 py-6">
            <Separator />
          </div>

          <div className="space-y-2 px-5">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 py-6 text-sm font-normal hover:bg-primary hover:text-white "
            >
              <HomeIcon size={16} className="ml-2" />
              <span className="block">Início</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 py-6 text-sm font-normal hover:bg-primary hover:text-white "
            >
              <HomeIcon size={16} className="ml-2" />
              <span className="block">Meus Pedidos</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 py-6 text-sm font-normal hover:bg-primary hover:text-white "
            >
              <HeartIcon size={16} className="ml-2" />
              <span className="block">Restaurantes Favoritos</span>
            </Button>
          </div>
          <div className="px-5 py-6">
            <Separator />
          </div>

          <div className="px-5">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 py-6 text-sm font-normal hover:bg-primary hover:text-white "
            >
              <LogOutIcon size={16} className="ml-2" />
              <span className="block">Sair</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Header

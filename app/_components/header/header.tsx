import Image from 'next/image'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

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
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </header>
  )
}

export default Header

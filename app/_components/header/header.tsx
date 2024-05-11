import Image from 'next/image'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex justify-between">
      <Link href="/">
        <Image src="/logo.png" alt="Logo da iaFood" width={100} height={30} />
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

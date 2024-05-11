import Image from 'next/image'
import { Badge } from '../ui/badge'

interface StartBadgeProps {
  varient: 'default' | 'secondary' | 'destructive' | 'outline'
}

const StartBadge = ({ varient }: StartBadgeProps) => {
  return (
    <Badge
      variant={varient}
      className="gap-1 rounded-full px-[10px] py-1 font-bold"
    >
      <Image src="/star-icon.png" alt="Estrela" width={12} height={13} />
      <span className="text-xs">5.0</span>
    </Badge>
  )
}

export default StartBadge

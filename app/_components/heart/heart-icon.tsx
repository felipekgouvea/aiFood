import { HeartIcon } from 'lucide-react'
import { Button } from '../ui/button'

interface HeartProps {
  buttonSize: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
  heartSize: number
}

const Heart = ({ buttonSize, heartSize }: HeartProps) => {
  return (
    <Button size={buttonSize} className="rounded-full bg-[#3D3D3C]">
      <HeartIcon size={heartSize} className="fill-white" />
    </Button>
  )
}

export default Heart

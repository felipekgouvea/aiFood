import { formatCurrency } from '@/app/_helpers/price'
import { Restaurant } from '@prisma/client'
import { BikeIcon, TimerIcon } from 'lucide-react'
import { Card } from '../ui/card'

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className=" mt-6 flex justify-around py-3 ">
      <div className="flex flex-col items-center gap-[2px]">
        <div className="item-center flex gap-1">
          <span className="text-xs text-muted-foreground">Entrega</span>
          <BikeIcon size={14} />
        </div>
        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-xs font-bold">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <span className="text-xs font-semibold">Grátis</span>
        )}
      </div>

      <div className="flex flex-col items-center gap-[2px]">
        <div className="item-center flex gap-1">
          <span className="text-xs text-muted-foreground">Entrega</span>
          <TimerIcon size={14} />
        </div>
        <span className="text-xs font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </span>
      </div>
    </Card>
  )
}

export default DeliveryInfo

'use client'

import { Restaurant } from '@prisma/client'
import Image from 'next/image'
import { formatCurrency } from '@/app/_helpers/price'
import Link from 'next/link'
import Heart from '../heart/heart-icon'
import StartBadge from '../badge/start-badge'
import { cn } from '@/app/_lib/utils'

interface RestaurantItemProps {
  restaurant: Restaurant
  className?: string
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  return (
    <Link
      className={cn('w-[266px] min-w-[266px]', className)}
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-2 pt-4">
        <div className="relative h-[136px] w-full ">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
          <div className="absolute left-4 top-3">
            <StartBadge varient="default" />
          </div>

          <div className="absolute right-2 top-2">
            <Heart buttonSize="default" heartSize={18} />
          </div>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-bold">{restaurant.name}</h3>

          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <Image
                src="/bike-icon.png"
                alt="Icone de Tempo de espera"
                width={12}
                height={12}
                className="text-primary"
              />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? 'Entrega grátis'
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src="/time-icon.png"
                alt="Icone de Tempo de espera"
                width={12}
                height={12}
                className="text-primary"
              />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantItem

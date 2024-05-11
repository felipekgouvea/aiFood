import StartBadge from '@/app/_components/badge/start-badge'
import DeliveryInfo from '@/app/_components/delivery/delivery-info'
// import ProductList from '@/app/_components/product/product-list'
import { Prisma } from '@prisma/client'

import Image from 'next/image'

interface RestaurantDetailsProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: {
        include: {
          product: {
            include: {
              restaurant: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  }>
}

const RestaurantDetails = ({ restaurant }: RestaurantDetailsProps) => {
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="flex items-center justify-between gap-[0.375rem] px-5">
        <div className="flex gap-2">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xl font-bold">{restaurant.name}</span>
        </div>
        <div>
          <StartBadge varient="secondary" />
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <span className="flex min-h-7 min-w-[167px] items-center justify-center rounded-s-sm bg-[#F4F4F5] text-muted-foreground">
            {category.name}
          </span>
        ))}
      </div>

      <div className="mt-6 px-5">
        <h2 className="mb-6 text-sm font-bold">Mais Pedidos</h2>
        {/* <ProductList products={cate} /> */}
      </div>
    </div>
  )
}

export default RestaurantDetails

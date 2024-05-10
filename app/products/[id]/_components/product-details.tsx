'use client'

import DiscountBadge from '@/app/_components/badge/discount-badge'
import ProductList from '@/app/_components/product/product-list'
import { Button } from '@/app/_components/ui/button'
import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Prisma } from '@prisma/client'
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1)

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1)
  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1

      return currentState - 1
    })

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            {product.discountPercentage > 0 && (
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculeteProductTotalPrice(product))}
              </h2>
            )}
            <DiscountBadge product={product} />
          </div>
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              {`De: ${formatCurrency(Number(product.price))}`}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            onClick={handleDecreaseQuantityClick}
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button
            size="icon"
            variant="default"
            onClick={handleIncreaseQuantityClick}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className=" mt-6 flex justify-around rounded-xl border border-solid border-[#EEEEEE] px-5 py-3 shadow-sm">
        <div className="flex flex-col items-center gap-[2px]">
          <div className="item-center flex gap-1">
            <span className="text-xs text-muted-foreground">Entrega</span>
            <BikeIcon size={14} />
          </div>
          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-bold">
              {formatCurrency(Number(product.restaurant.deliveryFee))}
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
            {product.restaurant.deliveryTimeMinutes} min
          </span>
        </div>
      </div>

      <div className="px-5 py-6">
        <h2 className="pb-3 font-bold">Sobre</h2>
        <p className="text-justify text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>

      <div className="px-5 py-6">
        <h2 className="pb-3 font-bold">Sucos</h2>
        <ProductList products={complementaryProducts} />
      </div>

      <div className="mt-6 px-5">
        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>
    </div>
  )
}

export default ProductDetails

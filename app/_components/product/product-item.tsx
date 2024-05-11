'use client'

import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { ArrowDownIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/app/_lib/utils'

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>
  className?: string
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn('w-[150px] min-w-[150px]', className)}
      href={`/products/${product.id}`}
    >
      <div className="w-full space-y-2">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
          {product.discountPercentage > 0 && (
            <Badge
              variant="destructive"
              className="absolute left-4 top-3 flex items-center justify-center rounded-full px-2 py-1 text-white hover:bg-destructive"
            >
              <ArrowDownIcon size={12} />
              {`${product.discountPercentage}%`}
            </Badge>
          )}
        </div>
        <div>
          <h2 className="overflow-hidden text-ellipsis text-nowrap font-semibold">
            {product.name}
          </h2>
          <div className="flex items-center justify-between">
            <h3 className="font-bold">
              {formatCurrency(calculeteProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>
          <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem

'use client'

import DiscountBadge from '@/app/_components/badge/discount-badge'
import Cart from '@/app/_components/cart/cart'
import DeliveryInfo from '@/app/_components/delivery/delivery-info'
import ProductList from '@/app/_components/product/product-list'
import { Button } from '@/app/_components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import { CartContext } from '@/app/_context/cart'
import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Prisma } from '@prisma/client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useContext, useState } from 'react'

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
  const { addProductToCart } = useContext(CartContext)

  const [isOpenCart, setIsOpenCart] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCartClick = () => {
    setIsOpenCart(true)
    addProductToCart(product, quantity)
  }

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1)

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1

      return currentState - 1
    })

  return (
    <>
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

        <div className="px-5">
          <DeliveryInfo restaurant={product.restaurant} />
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
          <Button
            className="w-full p-6 font-semibold"
            onClick={handleAddToCartClick}
          >
            Adicionar à sacola
          </Button>
        </div>
      </div>

      <Sheet open={isOpenCart} onOpenChange={setIsOpenCart}>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="pb-8 text-left text-lg font-semibold">
              Sacola
            </SheetTitle>
          </SheetHeader>
          <h1>
            <Cart />
          </h1>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ProductDetails

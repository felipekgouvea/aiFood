'use client'

import Cart from '@/app/_components/cart/cart'
import { Button } from '@/app/_components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import { CartContext } from '@/app/_context/cart'
import { formatCurrency } from '@/app/_helpers/price'
import { Restaurant } from '@prisma/client'
import { useContext, useState } from 'react'

interface CartBannerProps {
  restaurant: Pick<Restaurant, 'id'>
}
const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext)
  const [isOpenCart, setIsOpenCart] = useState(false)

  const restaurantHasProductOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  )

  if (!restaurantHasProductOnCart) return null

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted-foreground bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{' '}
            <span className="text-xs text-muted-foreground">
              / {totalQuantity} {totalQuantity > 1 ? 'itens' : 'item'}
            </span>
          </h3>
        </div>
        <Button size="sm" onClick={() => setIsOpenCart(true)}>
          Ver Sacola
        </Button>
        <Sheet open={isOpenCart} onOpenChange={setIsOpenCart}>
          <SheetContent className="w-[90%]">
            <SheetHeader>
              <SheetTitle className="pb-3 text-left text-lg font-semibold">
                Sacola
              </SheetTitle>
            </SheetHeader>
            <Cart setIsOpenCart={setIsOpenCart} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default CartBanner

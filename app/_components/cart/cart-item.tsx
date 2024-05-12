import { CartProduct } from '@/app/_context/cart'
import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

interface CartItemProps {
  cartProduct: CartProduct
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const [quantity, setQuantity] = useState(1)

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1)

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1

      return currentState - 1
    })
  return (
    <div className=" flex items-center justify-between">
      <div className="flex items-start gap-6">
        <div className="relative aspect-square h-28 w-28 ">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold">{cartProduct.name}</h2>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">
                {formatCurrency(calculeteProductTotalPrice(cartProduct))}
              </h3>
              {cartProduct.discountPercentage > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(Number(cartProduct.price))}
                </span>
              )}
            </div>
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
      </div>

      <div>
        <Button
          size="icon"
          variant="outline"
          className="border border-[#cac3c3] hover:bg-primary hover:text-white"
        >
          <Trash2Icon size={20} />
        </Button>
      </div>
    </div>
  )
}

export default CartItem

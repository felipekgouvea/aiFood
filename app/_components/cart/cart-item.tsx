import { CartContext, CartProduct } from '@/app/_context/cart'
import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from 'lucide-react'
import { useContext } from 'react'

interface CartItemProps {
  cartProduct: CartProduct
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductToCart,
  } = useContext(CartContext)

  const handleIncreaseProductClick = () => {
    increaseProductQuantity(cartProduct.id)
  }

  const handleDecreaseProductClick = () => {
    decreaseProductQuantity(cartProduct.id)
  }

  const handleRemoveProductToCartClick = () => {
    removeProductToCart(cartProduct.id)
  }

  return (
    <div className=" flex items-center justify-between">
      <div className="flex items-start gap-3">
        <div className="relative aspect-square h-24 w-24">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold">{cartProduct.name}</h2>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold">
                {formatCurrency(
                  calculeteProductTotalPrice(cartProduct) *
                    cartProduct.quantity,
                )}
              </h3>
              {cartProduct.discountPercentage > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(
                    Number(cartProduct.price) * cartProduct.quantity,
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDecreaseProductClick}
              className="h-8 w-8 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon size={14} />
            </Button>

            <span className="w-8">{cartProduct.quantity}</span>

            <Button
              size="icon"
              variant="default"
              onClick={handleIncreaseProductClick}
              className="h-8 w-8"
            >
              <ChevronRightIcon size={14} />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Button
          size="icon"
          variant="outline"
          onClick={handleRemoveProductToCartClick}
          className="h-8 w-8 border border-[#cac3c4] hover:bg-primary hover:text-white"
        >
          <Trash2Icon size={16} />
        </Button>
      </div>
    </div>
  )
}

export default CartItem

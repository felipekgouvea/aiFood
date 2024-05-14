import { CartContext } from '@/app/_context/cart'
import { useContext } from 'react'
import CartItem from './cart-item'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { formatCurrency } from '@/app/_helpers/price'
import { Button } from '../ui/button'

const Cart = () => {
  const { products, totalDiscounts, totalPrice, subtotalPrice } =
    useContext(CartContext)

  let totalDelivery = 0

  if (products.length > 0) {
    totalDelivery = Number(products?.[0].restaurant.deliveryFee)
  }

  return (
    <div className="flex h-screen flex-col justify-between py-5">
      {products.length > 0 ? (
        <>
          <div className="space-y-4">
            {products.map((product) => (
              <CartItem cartProduct={product} key={product.id} />
            ))}
          </div>

          <div className="mt-6">
            <Card>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">SubTotal</span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Entrega</span>
                  <span className="font-semibold uppercase text-primary">
                    {Number(products?.[0].restaurant.deliveryFee) === 0
                      ? 'Grátis'
                      : formatCurrency(Number(totalDelivery))}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Descontos</span>-{' '}
                  {formatCurrency(totalDiscounts)}
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="text-sm font-semibold">
                    {totalDelivery === 0
                      ? formatCurrency(totalPrice)
                      : formatCurrency(totalPrice + totalDelivery)}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Button className="mt-6 w-full">Finalizar Pedido</Button>
          </div>
        </>
      ) : (
        <h2 className="font-semibold">Sua sacola está vazia.</h2>
      )}
    </div>
  )
}

export default Cart

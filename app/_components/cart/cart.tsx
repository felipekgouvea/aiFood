import { CartContext } from '@/app/_context/cart'
import { useContext, useState } from 'react'
import CartItem from './cart-item'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { formatCurrency } from '@/app/_helpers/price'
import { Button } from '../ui/button'
import { createOrder } from '@/app/_actions/order'
import { OrderStatus } from '@prisma/client'
import { useSession } from 'next-auth/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { Loader2 } from 'lucide-react'

const Cart = () => {
  const { data } = useSession()
  const { products, totalDiscounts, totalPrice, subtotalPrice, clearCart } =
    useContext(CartContext)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleFinshOrderClick = async () => {
    if (!data?.user) return

    const restaurant = products[0].restaurant

    try {
      setIsSubmitLoading(true)
      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
      })

      clearCart()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitLoading(false)
    }
  }

  let totalDelivery = 0

  if (products.length > 0) {
    totalDelivery = Number(products?.[0].restaurant.deliveryFee)
  }

  return (
    <>
      <div className="flex flex-col justify-between py-5">
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
              <Button
                className="mt-6 w-full p-6"
                onClick={() => setIsConfirmDialogOpen(true)}
                disabled={isSubmitLoading}
              >
                {isSubmitLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Finalizar Pedido
              </Button>
            </div>
          </>
        ) : (
          <h2 className="font-semibold">Sua sacola está vazia.</h2>
        )}
      </div>
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termo e condições da
              nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full border border-muted-foreground">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-full border border-muted-foreground"
              onClick={handleFinshOrderClick}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Cart

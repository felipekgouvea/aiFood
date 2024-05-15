'use client'

import { Avatar, AvatarImage } from '@/app/_components/ui/avatar'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent, CardFooter } from '@/app/_components/ui/card'
import { Separator } from '@/app/_components/ui/separator'
import { formatCurrency } from '@/app/_helpers/price'
import { OrderStatus, Prisma } from '@prisma/client'
import { ChevronRight } from 'lucide-react'

interface MyOrdersItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true
      products: {
        include: {
          product: true
        }
      }
    }
  }>
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case 'PENDING':
      return 'Pendente'
    case 'PREPARING':
      return 'Em Preparo'
    case 'DELEVERING':
      return 'Em Entrega'
    case 'DELIVERED':
      return 'Entregue'
    case 'CANCELED':
      return 'Cancelado'
  }
}

const MyOrdersItem = ({ order }: MyOrdersItemProps) => {
  return (
    <Card className="border-[#c2b5b5] shadow-md">
      <CardContent className="space-y-4 p-5">
        {order.status === 'PENDING' && (
          <div>
            <Badge
              variant="pending"
              className="p-1 normal-case tracking-widest"
            >
              {getOrderStatusLabel(order.status)}
            </Badge>
          </div>
        )}

        {order.status === 'PREPARING' && (
          <div>
            <Badge
              variant="preparing"
              className="p-1 normal-case tracking-widest"
            >
              {getOrderStatusLabel(order.status)}
            </Badge>
          </div>
        )}

        {order.status === 'DELEVERING' && (
          <div>
            <Badge
              variant="delevering"
              className="p-1 normal-case tracking-widest"
            >
              {getOrderStatusLabel(order.status)}
            </Badge>
          </div>
        )}

        {order.status === 'DELIVERED' && (
          <div>
            <Badge
              variant="delivered"
              className="p-1 normal-case tracking-widest"
            >
              {getOrderStatusLabel(order.status)}
            </Badge>
          </div>
        )}

        {order.status === 'CANCELED' && (
          <div>
            <Badge
              variant="canceled"
              className="p-1 normal-case tracking-widest"
            >
              {getOrderStatusLabel(order.status)}
            </Badge>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Avatar className=" h-6 w-6 border-none">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>
            <span className="font-bold text-[#323232]">
              {order.restaurant.name}
            </span>
          </div>
          <ChevronRight />
        </div>
        <Separator />

        <div className="flex flex-col gap-2">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-1 space-x-1">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground ">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <Separator />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="font-semibold">
          {formatCurrency(Number(order.totalPrice) + Number(order.deliveryFee))}
        </span>
        <Button
          size="sm"
          variant="link"
          className="text-sm font-semibold hover:no-underline"
          disabled={order.status !== 'DELIVERED'}
        >
          Adicionar a Sacola
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MyOrdersItem

import { getServerSession } from 'next-auth'
import { db } from '../_lib/prisma'
import { authOptions } from '../_lib/auth'
import { redirect } from 'next/navigation'
import Header from '../_components/header/header'
import MyOrdersItem from './_components/my-orders-item'

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect('/')
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createAt: 'desc',
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  })

  return (
    <>
      <div className="px-5 py-7">
        <Header />
      </div>
      <div className="px-5 pb-5">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>

        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div key={order.id}>
              <MyOrdersItem order={order} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MyOrdersPage

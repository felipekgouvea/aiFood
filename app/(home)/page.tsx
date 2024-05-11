import Image from 'next/image'
import CategoryList from '../_components/category/category-list'
import Header from '../_components/header/header'
import Search from '../_components/search/search'
import ProductList from '../_components/product/product-list'
import { ChevronRight } from 'lucide-react'
import RestaurantList from '../_components/restaurant/restaurant-list'
import { db } from '../_lib/prisma'
import { Button } from '../_components/ui/button'
import Link from 'next/link'

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: true,
    },
  })

  return (
    <>
      <div className="px-5 pt-6">
        <Header />
      </div>

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas."
          width={0}
          height={0}
          sizes="100vh"
          quality={100}
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="px-5 pt-6">
        <div className="flex justify-between">
          <h1 className="pb-4 text-lg font-semibold">Pedidos Recomendados</h1>
          <button className="flex text-primary">
            Ver todos
            <ChevronRight />
          </button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-02.png"
          alt="Lanches a partir de R$ 17,90."
          width={0}
          height={0}
          sizes="100vh"
          quality={100}
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="space-y-4 px-5 py-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              <span className="flex items-center">
                Ver todos
                <ChevronRight />
              </span>
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  )
}

export default Home

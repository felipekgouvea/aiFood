import Header from '@/app/_components/header/header'
import ProductItem from '@/app/_components/product/product-item'
import { db } from '@/app/_lib/prisma'

const RecommendedProductPage = async () => {
  const recommendedProducts = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <>
      <div className="px-5 pt-6">
        <Header />
        <h2 className="pb-6 pt-6 text-lg font-semibold">
          Produtos Recomendados
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-6 px-5">
        {recommendedProducts.map((product) => (
          <ProductItem
            product={product}
            key={product.id}
            className="min-w-full max-w-full"
          />
        ))}
      </div>
    </>
  )
}

export default RecommendedProductPage

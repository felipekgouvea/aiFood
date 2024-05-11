import { db } from '@/app/_lib/prisma'
import Header from '../../../_components/header/header'
import ProductItem from '../../../_components/product/product-item'
import { notFound } from 'next/navigation'

interface CategoriesPageProps {
  params: {
    id: string
  }
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      product: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!category) {
    return notFound()
  }

  return (
    <>
      <div className="px-5 pt-6">
        <Header />
        <h2 className="pb-6 pt-6 text-lg font-semibold">{category.name}</h2>
      </div>
      <div className="grid grid-cols-2 gap-6 px-5">
        {category.product.map((product) => (
          <ProductItem
            product={product}
            key={product.id}
            className="min-w-full"
          />
        ))}
      </div>
    </>
  )
}

export default CategoriesPage

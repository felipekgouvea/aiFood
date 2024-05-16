import { db } from '@/app/_lib/prisma'
import CaterogyItem from './category-item'

const CategoryList = async () => {
  const categories = await db.category.findMany({})

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <CaterogyItem category={category} key={category.id} />
      ))}
    </div>
  )
}

export default CategoryList

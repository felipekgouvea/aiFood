import Header from '@/app/_components/header/header'
import RestaurantItem from '@/app/_components/restaurant/restaurant-item'
import { db } from '@/app/_lib/prisma'

const RecommendedRestaurants = async () => {
  const recommendedRestaurant = await db.restaurant.findMany({})

  return (
    <>
      <div className="px-5 pt-6">
        <Header />
        <h2 className="pb-6 pt-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
      </div>
      <div className="flex flex-col gap-6 px-5">
        {recommendedRestaurant.map((restaurant) => (
          <RestaurantItem
            restaurant={restaurant}
            key={restaurant.id}
            className="min-w-full max-w-full"
          />
        ))}
      </div>
    </>
  )
}

export default RecommendedRestaurants

'use client'

import { useSearchParams } from 'next/navigation'
import Header from '../_components/header/header'
import { useEffect, useState } from 'react'
import { Restaurant } from '@prisma/client'
import { searchForRestaurant } from './_actions/search'
import RestaurantItem from '../_components/restaurant/restaurant-item'

const Restaurants = () => {
  const searchParams = useSearchParams()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get('search')
      if (!searchFor) return
      const foundRestaurants = await searchForRestaurant(searchFor)
      setRestaurants(foundRestaurants)
    }
    fetchRestaurants()
  }, [searchParams])

  return (
    <>
      <div className="px-5 pt-6">
        <Header />
        <h2 className="pb-6 pt-6 text-lg font-semibold">
          Restaurantes Encontrados
        </h2>
      </div>
      <div className="flex flex-col gap-6 px-5">
        {restaurants.map((restaurant) => (
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

export default Restaurants

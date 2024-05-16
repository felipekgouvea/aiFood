import { Suspense } from 'react'
import Restaurants from './[id]/_components/restaurants'

interface RestaurantsPageProps {
  params: {
    search?: string
  }
}

const RestaurantsPage = ({ params }: RestaurantsPageProps) => {
  return (
    <Suspense>
      <Restaurants params={params} />
    </Suspense>
  )
}

export default RestaurantsPage

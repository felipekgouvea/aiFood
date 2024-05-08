import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="">
      <RestaurantImage restaurant={restaurant} />
      {/* <ProductDetails product={product} complementaryProducts={juces} /> */}
    </div>
  );
};

export default RestaurantPage;

import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import StartBadge from "@/app/_components/badge/start-badge";
import DeliveryInfo from "@/app/_components/delivery/delivery-info";
import ProductList from "@/app/_components/product/product-list";
import CartBanner from "./_components/cart-banner";

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
    include: {
      categories: {
        orderBy: {
          name: "asc",
        },
        include: {
          product: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      product: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="">
      <RestaurantImage restaurant={restaurant} />

      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
        <div className="flex items-center justify-between gap-[0.375rem] px-5">
          <div className="flex gap-2">
            <div className="relative h-8 w-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-xl font-bold">{restaurant.name}</span>
          </div>
          <div>
            <StartBadge varient="secondary" />
          </div>
        </div>

        <div className="px-5">
          <DeliveryInfo restaurant={restaurant} />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
          {restaurant.categories.map((category) => (
            <div key={category.id}>
              <span className="flex min-h-7 min-w-[167px] items-center justify-center rounded-s-sm bg-[#F4F4F5] text-muted-foreground">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 px-5">
          <h2 className="mb-6 text-sm font-bold">Mais Pedidos</h2>
          <ProductList products={restaurant.product} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 px-5" key={category.id}>
            <h2 className="mb-6 text-sm font-bold">{category.name}</h2>
            <ProductList products={category.product} />
          </div>
        ))}
      </div>

      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;

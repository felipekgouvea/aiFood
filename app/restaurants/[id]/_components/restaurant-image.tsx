"use client";

import Heart from "@/app/_components/heart/heart-icon";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };
  return (
    <div className="relative h-[200px] w-full">
      <Image
        src={restaurant?.imageUrl}
        alt={restaurant?.name}
        fill
        className="object-cover"
      />
      <Button
        onClick={handleBackClick}
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
      >
        <ChevronLeftIcon />
      </Button>
      <div className="absolute right-4 top-4">
        <Heart />
      </div>
    </div>
  );
};

export default RestaurantImage;

"use client";

import { Restaurant } from "@prisma/client";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/app/_helpers/price";
import { HeartIcon } from "lucide-react";
import { Button } from "../ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="w-[266px] min-w-[266px] space-y-2 pt-4">
      <div className="relative h-[136px] w-full ">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />

        <Badge className="absolute left-4 top-3 gap-1 rounded-full  bg-white px-[10px] py-1 font-bold text-accent-foreground hover:bg-white">
          <Image src="/star-icon.png" alt="Estrela" width={12} height={13} />
          <span className="text-xs">5.0</span>
        </Badge>

        <Button
          size="icon"
          className="absolute right-2 top-2 h-7 w-7 rounded-full bg-[#3D3D3C]"
        >
          <HeartIcon size={14} className="fill-white" />
        </Button>
      </div>

      <div className="pt-3">
        <h3 className="text-sm font-bold">{restaurant.name}</h3>

        <div className="flex gap-4 pb-5 pt-3">
          <div className="flex items-center gap-1">
            <Image
              src="/bike-icon.png"
              alt="Icone de Tempo de espera"
              width={12}
              height={12}
              className="text-primary"
            />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Image
              src="/time-icon.png"
              alt="Icone de Tempo de espera"
              width={12}
              height={12}
              className="text-primary"
            />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;

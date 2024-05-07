"use client";

import {
  calculeteProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
        <Badge className="absolute left-4 top-3 flex items-center justify-center rounded-full px-2 py-1 text-white">
          <ArrowDownIcon size={12} />
          {`${product.discountPercentage * 10}%`}
        </Badge>
      </div>
      <div>
        <h2 className="overflow-hidden text-ellipsis text-nowrap font-semibold">
          {product.name}
        </h2>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">
            {formatCurrency(calculeteProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>
        <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-muted-foreground">
          {product.restaurant.name}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;

import { Product } from "@prisma/client";
import { Badge } from "../ui/badge";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <div className="rounded-full text-white hover:bg-primary">
      <Badge className="px-2 py-1">
        <ArrowDownIcon size={12} />
        {`${product.discountPercentage}%`}
      </Badge>
    </div>
  );
};

export default DiscountBadge;

import { Product } from '@prisma/client'
import { Badge } from '../ui/badge'
import { ArrowDownIcon } from 'lucide-react'

interface DiscountBadgeProps {
  product: Pick<Product, 'discountPercentage'>
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <div className="rounded-full text-primary hover:bg-primary">
      <Badge variant="discount" className="flex items-center gap-1 px-3 py-1">
        <ArrowDownIcon size={12} />
        {`${product.discountPercentage}%`}
      </Badge>
    </div>
  )
}

export default DiscountBadge

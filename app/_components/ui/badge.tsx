import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/app/_lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-white border-transparent text-foreground hover:bg-white',
        discount: 'bg-primary text-white border-transparent hover:bg-primary',
        secondary:
          'border-transparent bg-foreground text-white hover:bg-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        pending:
          'bg-[#9AA2AD] border-transparent text-white hover:bg-bg-[#9AA2AD]',
        preparing:
          'bg-[#dad72f] border-transparent text-white hover:bg-[#dad72f]',
        delevering:
          'bg-[#1AB789] border-transparent text-white hover:bg-[#1AB789]',
        delivered:
          'bg-[#EEEEEE] border-transparent text-foreground hover:bg-[#EEEEEE]',
        canceled: 'bg-primary border-transparent text-white hover:bg-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

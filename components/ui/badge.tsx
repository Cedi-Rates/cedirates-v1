import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Hexagon } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center !text-white rounded-radius-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 truncate",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary hover:bg-primary/80",
        secondary: "bg-primary-neutral-500",
        destructive: "bg-primary-error-500",
        sucesss: "bg-primary-success-500",
        warning: "bg-primary-warning-500",
      },
      size: {
        default: "h-[26px] py-spacing-4 px-spacing-8 gap-spacing-8 text-caption-md-regular",
        s: "h-[26px] py-spacing-4 px-spacing-8 gap-spacing-8 text-caption-md-regular",
        m: "h-7 py-spacing-4 px-spacing-12 gap-spacing-8 text-paragraph-sm-regular",
        xs: "h-5 p-spacing-4 gap-spacing-4 text-caption-sm-regular",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  leading?: boolean;
  trailing?: boolean;
}

function Badge({
  className, variant, size, leading = false, trailing = false, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {leading && <Hexagon className="h-3 w-3" />}
      {children}
      {trailing && <Hexagon className="h-3 w-3" />}
    </div>
  )
}

export { Badge, badgeVariants }

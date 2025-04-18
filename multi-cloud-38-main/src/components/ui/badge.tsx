
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        cloud: {
          google: "bg-blue-100 text-blue-800 border-blue-200",
          onedrive: "bg-cyan-100 text-cyan-800 border-cyan-200",
        },
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  cloudProvider?: 'google' | 'onedrive'
}

function Badge({ className, variant, cloudProvider, ...props }: BadgeProps) {
  const variantToUse = cloudProvider ? 'cloud' : variant
  
  return (
    <div
      className={cn(
        badgeVariants({ variant: variantToUse as any }), 
        cloudProvider === 'google' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
        cloudProvider === 'onedrive' ? 'bg-cyan-100 text-cyan-800 border-cyan-200' : '',
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

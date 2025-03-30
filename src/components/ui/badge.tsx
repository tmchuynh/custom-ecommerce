import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-white transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        outline: "text-foreground",
        green: "border-transparent bg-green-600 shadow-sm hover:bg-green-400",
        red: "border-transparent bg-red-800 shadow-sm hover:bg-red-400",
        blue: "border-transparent bg-blue-500 shadow-sm hover:bg-blue-400",
        yellow:
          "border-transparent bg-yellow-500 text-black shadow-sm hover:bg-yellow-400",
        purple:
          "border-transparent bg-purple-500 shadow-sm hover:bg-purple-400",
        pink: "border-transparent bg-pink-500 shadow-sm hover:bg-pink-400",
        gray: "border-transparent bg-gray-500 shadow-sm hover:bg-gray-400",
        orange:
          "border-transparent bg-orange-500 shadow-sm hover:bg-orange-400",
        teal: "border-transparent bg-teal-500 shadow-sm hover:bg-teal-400",
        lime: "border-transparent bg-lime-500 shadow-sm hover:bg-lime-400",
        emerald:
          "border-transparent bg-emerald-500 shadow-sm hover:bg-emerald-400",
        cyan: "border-transparent bg-cyan-500 shadow-sm hover:bg-cyan-400",
        violet:
          "border-transparent bg-violet-500 shadow-sm hover:bg-violet-400",
        rose: "border-transparent bg-rose-500 shadow-sm hover:bg-rose-400",
        indigo:
          "border-transparent bg-indigo-500 shadow-sm hover:bg-indigo-400",
        amber: "border-transparent bg-amber-500 shadow-sm hover:bg-amber-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

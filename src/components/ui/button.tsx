import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-secondary hover:text-secondary-foreground hover:border-secondary",
        outline:
          "border border-accent bg-transparent shadow-xs hover:bg-secondary hover:text-secondary-foreground",
        ghost: "border-transparent bg-transparent hover:text-accent",
        link: "border-transparent text-primary underline-offset-4 hover:underline group-hover:text-secondary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-xs hover:bg-teritary hover:text-teritary-foreground hover:border-teritary",
        secondaryOutline:
          "border border-secondary bg-transparent shadow-xs hover:bg-teritary hover:text-teritary-foreground hover:border-teritary",
        secondaryGhost:
          "border-transparent bg-transparent text-secondary hover:text-teritary-foreground",
        secondaryLink:
          "border-transparent text-secondary underline-offset-4 hover:underline",
        teritary:
          "border-transparent bg-teritary text-teritary-foreground shadow-xs hover:bg-secondary hover:text-secondary-foreground hover:border-secondary",
        teritaryOutline:
          "border border-teritary bg-transparent shadow-xs hover:bg-secondary hover:text-secondary-foreground hover:border-secondary",
        teritaryGhost:
          "border-transparent bg-transparent text-teritary hover:text-secondary-foreground",
        teritaryLink:
          "border-transparent text-teritary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-transparent hover:text-destructive border-destructive",
        destructiveOutline:
          "border border-destructive bg-transparent shadow-xs hover:bg-destructive hover:text-destructive-foreground hover:border-destructive",
        destructiveGhost:
          "border-transparent bg-transparent text-destructive hover:text-destructive-foreground",
        destructiveLink:
          "border-transparent text-destructive underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-6 w-6 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const buttonClassName = React.useMemo(
      () => cn(buttonVariants({ variant, size, className })),
      [variant, size, className]
    );

    return <Comp className={buttonClassName} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

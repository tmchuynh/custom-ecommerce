import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";


const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 disabled:opacity-50 aria-invalid:border-destructive focus-visible:border-ring rounded-lg aria-invalid:ring-destructive/20 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/40 font-medium text-sm whitespace-nowrap transition-all [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:
          "text-foreground shadow-sm hover:bg-primary/90 hover:shadow-md focus-visible:ring-primary/20",

        minimal:
          "bg-card text-card-foreground border border-muted shadow-none hover:bg-muted/40 hover:border-muted-foreground/20 focus-visible:ring-muted-foreground/30",

        modern:
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md hover:shadow-lg hover:from-primary/90 hover:to-primary/70 focus-visible:ring-primary/30",
        classic:
          "bg-secondary text-secondary-foreground border border-secondary/20 shadow-sm hover:bg-secondary/80 hover:shadow-md focus-visible:ring-secondary/20",

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md focus-visible:ring-destructive/20",
        outline:
          "border border-border bg-transparent text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-md focus-visible:ring-border/20",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-colors focus-visible:ring-muted/40",
        link: "text-primary underline-offset-4 hover:underline bg-transparent shadow-none focus-visible:ring-primary/20",
        icon: "bg-transparent text-muted-foreground hover:text-accent shadow-none focus-visible:ring-accent/20",
      },
      size: {
        xs: "h-6 px-2 text-xs gap-1 has-[>svg]:px-1.5",
        sm: "h-8 px-3 text-xs gap-1.5 has-[>svg]:px-2.5",
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-11 px-6 text-base has-[>svg]:px-5",
        xl: "h-12 px-8 text-lg has-[>svg]:px-7",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "modern",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "modern",
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

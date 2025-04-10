import { cn } from "@/lib/utils";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="bg-primary rounded-full w-2 h-2 transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block group-hover:opacity-0 transition-all group-hover:translate-x-12 duration-300">
          {children}
        </span>
      </div>
      <div className="top-0 z-10 absolute flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 w-full h-full text-primary-foreground transition-all translate-x-12 group-hover:-translate-x-5 duration-300">
        <span>{children}</span>
        <FaArrowRight />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

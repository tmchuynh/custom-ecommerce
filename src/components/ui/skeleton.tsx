import { SkeletonProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({ className, text, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("flex justify-center items-center text-5xl", className)}
      {...props}
    >
      {text && <span className="skeleton-text font-Dosis">{text}</span>}
    </div>
  );
}

export { Skeleton };

import { SkeletonProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({ className, text, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "flex justify-center items-center text-5xl bg-muted",
        className
      )}
      {...props}
    >
      {text && (
        <span className="font-Ruthie text-center text-primary z-20">
          {text}
        </span>
      )}
    </div>
  );
}

export { Skeleton };

import { SkeletonProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

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
        <span className="z-20 font-Ruthie text-center text-primary">
          {text}
        </span>
      )}
    </div>
  );
}

export { Skeleton };

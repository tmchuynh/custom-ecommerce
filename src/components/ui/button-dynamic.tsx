import { cn } from "@/lib/utils";
import React from "react";
import { LuArrowBigRightDash } from "react-icons/lu";
import { Button } from "./button";

interface DynamicButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  variant = "default",
  text,
  icon: Icon = LuArrowBigRightDash,
  onClick,
  className,
  iconClassName,
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={cn("mt-2 group w-1/2", className)}
    >
      {text}
      {Icon && (
        <span
          className={cn(
            "inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-4",
            iconClassName
          )}
        >
          <Icon className="w-4 h-4" />
        </span>
      )}
    </Button>
  );
};

export default DynamicButton;

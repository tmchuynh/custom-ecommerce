import { cn } from "@/lib/utils";
import React from "react";
import { LuArrowBigRightDash } from "react-icons/lu";
import { Button } from "./button";
import { DynamicButtonProps } from "@/lib/interfaces";

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
            "inline-block px-2 transition-transform duration-300 ease-in-out group-hover:translate-x-4",
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

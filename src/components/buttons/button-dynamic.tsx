import { cn } from "@/lib/utils/utils";
import React from "react";
import { LuArrowBigRightDash } from "react-icons/lu";
import { Button } from "../ui/button";
import { DynamicButtonProps } from "@/lib/types";

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
      className={cn("mt-2 group w-1/2 gap-0", className)}
    >
      <p className="pl-5">{text}</p>
      {Icon && (
        <span
          className={cn(
            "inline-block px-5 transition-transform duration-300 ease-in-out group-hover:translate-x-2",
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

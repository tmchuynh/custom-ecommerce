"use client";

import { useCart } from "@/app/context/cartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartIcon() {
  const { totalItems } = useCart();
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCartClick}
      className="relative"
    >
      <ShoppingCart className="w-5 h-5" />
      {totalItems > 0 && (
        <Badge className="-top-2 -right-2 absolute flex justify-center items-center bg-red-500 p-0 rounded-full w-5 h-5 text-white text-xs">
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
      <span className="sr-only">Shopping cart</span>
    </Button>
  );
}

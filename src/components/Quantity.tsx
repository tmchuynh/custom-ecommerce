import { useCart } from "@/app/context/cartContext";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/lib/types";

function QuantityButtons({ product }: { product: ProductType }) {
  const { updateQuantity, removeFromCart, itemExistsInCart, getCartItem } =
    useCart();
  const foundItem = itemExistsInCart(product?.name);

  if (!foundItem) {
    return null;
  }

  const cartItem = getCartItem(product.name);

  const handleIncrement = () => {
    updateQuantity(product.name, product.quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(product.name, product.quantity - 1);
  };

  return (
    <div className="flex items-center gap-3">
      <Button onClick={handleDecrement}>-</Button>
      <Input readOnly value={cartItem?.quantity} className="w-12 text-center" />
      <Button onClick={handleIncrement}>+</Button>
      <Button
        variant="destructive"
        onClick={() => removeFromCart(product.name)}
      >
        Remove
      </Button>
    </div>
  );
}

export default QuantityButtons;

import { useCart } from "@/app/context/cartContext";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function QuantityButtons({ itemId }: { itemId: number }) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const foundItem = cartItems.find((item) => item.id === itemId);

  if (!foundItem) return null;

  const handleIncrement = () => {
    updateQuantity(itemId, foundItem.quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(itemId, foundItem.quantity - 1);
  };

  return (
    <div className="flex items-center gap-3">
      <Button onClick={handleDecrement}>-</Button>
      <Input readOnly value={foundItem.quantity} className="w-12 text-center" />
      <Button onClick={handleIncrement}>+</Button>
      <Button variant="destructive" onClick={() => removeFromCart(itemId)}>
        Remove
      </Button>
    </div>
  );
}

export default QuantityButtons;

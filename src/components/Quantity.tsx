import { useCart } from "@/app/context/cartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/lib/types";
import { JSX } from "react";

/**
 * A React component that renders quantity control buttons for a product in a shopping cart.
 * This component allows users to increment, decrement, or remove a product from the cart.
 * It interacts with the cart context to manage the product's quantity and existence in the cart.
 *
 * @param {Object} props - The props object.
 * @param {ProductType} props.product - The product object containing details about the item.
 *
 * @returns {JSX.Element | null} The rendered quantity control buttons if the product exists in the cart, or `null` if it does not.
 *
 * @remarks
 * - The component uses the `useCart` hook to access cart-related functions and data.
 * - The `handleIncrement` and `handleDecrement` functions update the product's quantity in the cart.
 * - The "Remove" button removes the product from the cart entirely.
 *
 * @example
 * ```tsx
 * <QuantityButtons product={product} />
 * ```
 */
function QuantityButtons({
  product,
}: {
  product: ProductType;
}): JSX.Element | null {
  const { updateQuantity, removeFromCart, itemExistsInCart, getCartItem } =
    useCart();
  const foundItem = itemExistsInCart(product.name);

  console.log(foundItem);

  if (!foundItem) {
    return null;
  }

  const cartItem = getCartItem(product.name);

  const handleIncrement = () => {
    if (cartItem) {
      console.log(product.name, cartItem.quantity);
      updateQuantity(product.name, cartItem.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.name, cartItem.quantity - 1);
    }
  };

  // Ensure quantity is a valid number and convert to string
  const quantity = cartItem?.quantity ? String(cartItem.quantity) : "";

  return (
    <div className="flex items-center gap-3">
      <Button onClick={handleDecrement}>-</Button>
      <Input readOnly value={quantity} className="w-12 text-center" />
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

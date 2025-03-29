import { useCart } from "@/app/context/cartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/lib/types";
import { Minus, Plus } from "lucide-react";
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
  localQuantity,
  setLocalQuantity,
}: {
  product: ProductType;
  localQuantity: number;
  setLocalQuantity: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element | null {
  const { updateQuantity, removeFromCart, itemExistsInCart, getCartItem } =
    useCart();
  const foundItem = itemExistsInCart(product.name);

  const cartItem = getCartItem(product.name);

  const displayQuantity =
    foundItem && cartItem ? cartItem.quantity : localQuantity;

  const handleIncrement = () => {
    if (foundItem && cartItem) {
      updateQuantity(product.name, cartItem.quantity + 1);
    } else {
      setLocalQuantity(localQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (foundItem && cartItem && cartItem.quantity > 1) {
      updateQuantity(product.name, cartItem.quantity - 1);
    } else if (!foundItem && localQuantity > 1) {
      setLocalQuantity(localQuantity - 1);
    }
  };

  // Ensure quantity is a valid number and convert to string
  const quantity = cartItem?.quantity ? String(cartItem.quantity) : "";

  return (
    <div className="flex items-center gap-3">
      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-medium">Quantity</h3>
        <div className="mt-2 flex items-center border border-gray-300 rounded-md">
          <button type="button" onClick={handleDecrement} className="p-2">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center">{String(displayQuantity)}</span>
          <button type="button" onClick={handleIncrement} className="p-2">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      {foundItem && (
        <Button
          variant="destructive"
          onClick={() => removeFromCart(product.name)}
        >
          Remove
        </Button>
      )}
    </div>
  );
}

export default QuantityButtons;

import { useCart } from "@/app/context/cartContext";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
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
  page,
  localQuantity,
  setLocalQuantity,
}: {
  product: ProductType;
  localQuantity: number;
  page: boolean;
  setLocalQuantity: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element | null {
  const { updateQuantity, removeFromCart, itemExistsInCart, getCartItem } =
    useCart();
  const foundItem = itemExistsInCart(product.name);
  const cartItem = getCartItem(product.name);

  return (
    <div className="flex items-end gap-3">
      {/* Quantity Selector */}
      <div className="flex flex-col items-center">
        <h3 className="font-medium text-sm">Quantity</h3>
        <input
          type="number"
          value={foundItem && cartItem ? cartItem.quantity ?? 1 : localQuantity}
          onChange={(e) => {
            const newQty = parseInt(e.target.value, 10);
            if (foundItem && cartItem) {
              updateQuantity(product.name, newQty);
            } else {
              setLocalQuantity(newQty);
            }
          }}
          className={cn("w-3/4 border rounded-md py-1 mt-1 text-center", {
            "flex-1 mt-3": !page,
          })}
        />
      </div>
      {foundItem &&
        (page ? (
          <Button
            variant="destructive"
            onClick={() => {
              removeFromCart(product.name);
              setLocalQuantity(1);
            }}
          >
            Remove
          </Button>
        ) : (
          <Button
            size={"sm"}
            variant="destructive"
            onClick={() => {
              removeFromCart(product.name);
              setLocalQuantity(1);
            }}
          >
            Remove
          </Button>
        ))}
    </div>
  );
}

export default QuantityButtons;

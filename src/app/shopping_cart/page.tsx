"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCart } from "../context/cartContext";
import { Button } from "@/components/ui/button";
import { JSX } from "react";

/**
 * Represents the shopping cart page of the e-commerce application.
 *
 * This component displays the items currently in the user's shopping cart,
 * allowing them to update item quantities, remove items, and view the total price.
 *
 * Features:
 * - Displays a list of cart items with their details (name, description, price, and quantity).
 * - Allows users to update the quantity of each item in the cart.
 * - Allows users to remove items from the cart.
 * - Displays the total price of all items in the cart.
 * - Shows a message when the cart is empty.
 *
 * Dependencies:
 * - Relies on the `useCart` hook to access cart data and actions.
 * - Uses utility functions like `cn` for conditional class names.
 * - Includes reusable components like `Skeleton` and `Button`.
 *
 * @component
 * @returns {JSX.Element} The rendered shopping cart page.
 */
const CartPage = (): JSX.Element => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } =
    useCart(); // Access cart data

  /**
   * Handles the update of an item's quantity in the shopping cart.
   *
   * @param id - The ID of the item to update.
   * @param quantity - The new quantity for the item.
   */
  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  /**
   * Handles the removal of an item from the shopping cart.
   * @param {number} id - The ID of the item to remove.
   */
  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className={cn("md:grid md:grid-cols-4 lg:grid-cols-7 pb-10", {
                "border-b": index !== cartItems.length - 1,
              })}
            >
              <div className="md:grid md:grid-cols-3 md:col-span-3 lg:col-span-5 lg:grid-cols-4 xl:grid-cols-7">
                {/* <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={175}
                    height={175}
                  /> */}
                <Skeleton className="h-full w-full rounded-xl hidden md:flex col-span-1 xl:col-span-2" />
                <div className="flex flex-col justify-center gap-y-3 col-span-2 xl:col-span-5">
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-sm font-medium">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-end space-x-4 py-9 md:col-span-1 lg:col-span-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="w-16 text-center border rounded-md"
                />
                <div className="text-lg font-medium">
                  ${Number(item.price) * item.quantity}
                </div>
                <Button
                  variant={"destructive"}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2">
            <div className="text-lg font-medium">Total:</div>
            <div className="text-xl font-bold">
              ${getTotalPrice().toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

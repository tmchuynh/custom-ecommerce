"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCart } from "../context/cartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } =
    useCart(); // Access cart data

  /**
   * Handles the update of an item's quantity in the shopping cart.
   *
   * @param id - The ID of the item to update.
   * @param quantity - The new quantity for the item.
   */
  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  /**
   * Handles the removal of an item from the shopping cart.
   * @param {number} id - The ID of the item to remove.
   */
  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-xl text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className={cn("flex items-center justify-between py-6", {
                  "border-b border-gray-300 ": index !== cartItems.length - 1,
                })}
              >
                <div className="flex items-center space-x-6">
                  {/* <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={175}
                    height={175}
                  /> */}
                  <Skeleton className="h-[175] w-[175] rounded-xl" />
                  <div className="flex flex-col gap-y-3">
                    <p className="text-lg font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 text-center border border-gray-300 rounded-md"
                  />
                  <div className="text-lg font-medium text-gray-900">
                    ${item.price * item.quantity}
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-lg font-medium text-gray-900">Total:</div>
            <div className="text-xl font-bold text-gray-900">
              ${getTotalPrice().toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { capitalize } from "@/lib/utils/format";
import { JSX } from "react";
import { TiWarning } from "react-icons/ti";
import { useCart } from "../context/cartContext";
import { useCurrency } from "../context/currencyContext";
import { useProduct } from "../context/productContext";

/**
 * Component that renders the shopping cart page.
 * Displays cart items, allows quantity updates and item removal, and shows order summary.
 *
 * Features:
 * - Empty cart message when no items present
 * - List of cart items with quantity controls and remove buttons
 * - Clear all items functionality with confirmation dialog
 * - Order summary with subtotal, tax, shipping and total
 * - Proceed to checkout button
 *
 * @returns {JSX.Element} The rendered cart page component
 *
 * @example
 * ```tsx
 * <CartPage />
 * ```
 */
const CartPage = (): JSX.Element => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
    calculateTaxAmount,
    calculateShippingCost,
    getTotalItems,
    getShippingMethod,
    getSubTotal,
  } = useCart(); // Access cart data

  const { selectedCurrency } = useCurrency();

  const { convertPrice } = useProduct();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[20rem] lg:h-[40rem] 2xl:h-[60rem]">
          <h1 className="mb-8 font-extrabold text-4xl text-center">
            Your Cart
          </h1>
          <p className="text-center text-xl">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <h1 className="mb-8 font-extrabold text-4xl text-center">
            Your Cart
          </h1>
          <div className="flex justify-end w-full">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="uppercase">
                  <TiWarning />
                  Remove All Items
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex gap-5">
                  <TiWarning
                    size={65}
                    className="text-destructive self-center"
                  />
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      all items in the cart.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>

                <AlertDialogFooter className="flex md:flex-row sm:flex-col sm:justify-start gap-3 mx-auto pt-2 md:w-2/5">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className={buttonVariants({ variant: "destructive" })}
                    onClick={() => clearCart()}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="space-y-8">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className={cn("md:grid md:grid-cols-4 lg:grid-cols-7 pb-10", {
                  "border-b": index !== cartItems.length - 1,
                })}
              >
                <div className="md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 md:col-span-3 lg:col-span-5">
                  {/* <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={175}
                    height={175}
                  /> */}
                  <Skeleton className="md:flex hidden col-span-1 xl:col-span-2 rounded-xl w-full h-60" />
                  <div className="flex flex-col justify-center gap-y-3 col-span-2 xl:col-span-5 pl-9">
                    <p className="font-medium text-lg">{item.name}</p>
                    <p className="font-medium text-sm">{item.description}</p>
                  </div>
                </div>

                <div className="flex justify-center md:justify-end items-center space-x-4 md:col-span-1 lg:col-span-2 py-9">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="border rounded-md w-16 text-center"
                  />
                  <div className="font-medium text-lg">
                    {convertPrice(
                      Number(item.price) * item.quantity,
                      selectedCurrency
                    )}
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

            <div className="flex flex-col justify-between gap-y-3">
              <div className="flex justify-between items-center">
                <div className="font-medium text-lg">Subtotal:</div>
                <div className="font-bold text-xl">
                  {convertPrice(getSubTotal(), selectedCurrency)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-medium text-lg">Tax:</div>
                <div className="font-bold text-xl">
                  {convertPrice(
                    calculateTaxAmount(getSubTotal(), "US"),
                    selectedCurrency
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="font-medium text-lg">
                  {capitalize(getShippingMethod(getTotalItems()))} Shipping
                </div>
                <div className="font-bold text-xl">
                  {convertPrice(
                    calculateShippingCost(getShippingMethod(getTotalItems())),
                    selectedCurrency
                  )}
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div className="font-medium text-lg">Total:</div>
                <div className="font-bold text-xl">
                  {convertPrice(getTotalPrice("US"), selectedCurrency)}
                </div>
              </div>
            </div>

            {/* Add checkout button */}
            <div className="flex justify-end mt-6">
              <Button className="px-8 py-3 w-full md:w-auto text-lg" asChild>
                <a href="/shopping_cart/checkout">Proceed to Checkout</a>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

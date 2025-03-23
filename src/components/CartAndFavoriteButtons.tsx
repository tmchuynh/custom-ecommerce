"use client";

import { useCart } from "@/app/context/cartContext";
import { ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { JSX } from "react";
import { toast } from "sonner";
import QuantityButtons from "./Quantity";
import { Button } from "./ui/button";

/**
 * A React component that renders buttons for adding a product to the cart or managing its quantity
 * if it is already in the cart. The layout adjusts based on the `page` prop.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {ProductType} props.product - The product to be displayed and managed.
 * @param {boolean} [props.page=true] - Determines the layout styling of the component.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <CartAndFavoritesButtons product={product} page={true} />
 *
 * @remarks
 * - If the product is already in the cart, the component renders quantity management buttons.
 * - If the product is not in the cart, it renders an "Add to Cart" button.
 * - The `handleAddToCart` function adds the product to the cart and displays a success toast.
 */
export default function CartAndFavoritesButtons({
  product,
  page = true,
}: {
  product: ProductType;
  page?: boolean;
}): JSX.Element {
  const { addToCart, getCartItem } = useCart();
  const foundItem = getCartItem(product.name);

  /**
   * Handles adding a product to the cart.
   *
   * @param {any} product - The product to add to the cart.
   * @param {number} id - The ID of the product (using index as fallback).
   * @returns {void}
   */
  const handleAddToCart = (product: any, id: string): void => {
    addToCart({
      id: id, // using the index as a fallback ID; consider using a unique product identifier if available
      name: product.name,
      description: product.description,
      price: parseFloat(product.price.replace("$", "")),
      quantity: 1,
      imageSrc: product.imageSrc,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className={cn("mt-5 pt-4 col-span-2", {
        "mt-0 w-11/12 mx-auto": page,
      })}
    >
      <div className="flex gap-5">
        {foundItem ? (
          <QuantityButtons product={product} />
        ) : (
          <Button onClick={() => handleAddToCart(product, product.name)}>
            <svg
              className="-ms-2 me-2 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Add to Cart
            <span className="sr-only">Add {product.name} to Cart</span>
          </Button>
        )}
      </div>
    </div>
  );
}

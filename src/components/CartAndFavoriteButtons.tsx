"use client";

import { useCart } from "@/app/context/cartContext";
import { ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { JSX, useState } from "react";
import { toast } from "sonner";
import QuantityButtons from "./Quantity";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

/**
 * Renders buttons for managing a product in the cart and favorites.
 *
 * This component displays either:
 * - A set of quantity control buttons if the product is already in the cart
 * - An "Add to Cart" button if the product is not in the cart
 *
 * @component
 * @param {Object} props - Component props
 * @param {ProductType} props.product - The product to be added to cart or favorites
 * @param {boolean} [props.page=true] - Flag indicating whether the component is rendered on a product page
 *                                      (affects styling)
 *
 * @returns {JSX.Element} A div containing cart interaction buttons
 *
 * @example
 * // Basic usage
 * <CartAndFavoritesButtons product={myProduct} />
 *
 * @example
 * // Usage with page flag set to false (for use in cards or listings)
 * <CartAndFavoritesButtons product={myProduct} page={false} />
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
  const [hovered, setHovered] = useState(false);

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
        "mt-0": page,
      })}
    >
      <div className="flex gap-5">
        <QuantityButtons product={product} />

        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300",
            {
              "translate-y-0": hovered,
              "translate-y-full": !hovered,
            }
          )}
        >
          <button
            className="w-full bg-white text-gray-900 py-2 rounded-full font-medium flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart(product, product.name);
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

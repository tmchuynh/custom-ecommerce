"use client";

import { useCart } from "@/app/context/cartContext";
import { Color, ProductType } from "@/lib/types";
import { cn, getAccessibleColor } from "@/lib/utils";
import { IoHeartCircle } from "react-icons/io5";
import { toast } from "sonner";
import QuantityButtons from "./Quantity";
import { Button } from "./ui/button";

export default function CartAndFavoritesButtons({
  product,
  page = true,
  relatedProduct = false,
  selectedColor,
  setSelectedColor,
}: {
  product: ProductType;
  page?: boolean;
  relatedProduct?: boolean;
  setSelectedColor: React.Dispatch<React.SetStateAction<Color>>;
  selectedColor: Color;
}) {
  const { addToCart, getCartItem } = useCart();
  const foundItem = getCartItem(product.name);

  const accessibleColor = getAccessibleColor(
    `${selectedColor.bgColor}`,
    "AAA",
    true
  );

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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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

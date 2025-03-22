"use client";

import { useCart } from "@/app/context/cartContext";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ProductType } from "@/lib/types";
import QuantityButtons from "./Quantity";
import { cn } from "@/lib/utils";
import { IoHeartCircle } from "react-icons/io5";
import { useTheme } from "next-themes";

export default function CartAndFavoritesButtons({
  product,
  page = true,
}: {
  product: ProductType;
  page?: boolean;
}) {
  const { addToCart, cartItems, itemExistsInCart, getCartItem } = useCart();
  const foundItem = getCartItem(product.name);
  const { theme } = useTheme();

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
      className={cn("mt-5 flex items-center", {
        "mt-0 flex-col-reverse items-start": page,
      })}
    >
      <div className="flex gap-5">
        {foundItem ? (
          <QuantityButtons product={product} />
        ) : (
          <Button onClick={() => handleAddToCart(product, product.name)}>
            Add to Cart
            <span className="sr-only">, {product.name}</span>
          </Button>
        )}
      </div>
      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        className={cn("mb-0 mx-8 dark:hover:bg-red-700 hover:bg-primary", {
          "absolute top-5 right-5 mx-0": page,
        })}
      >
        <IoHeartCircle
          className="rounded-full text-foreground"
          aria-hidden="true"
          style={{
            width: page ? "50px" : "35px",
            height: page ? "50px" : "35px",
          }}
        />

        <span className="sr-only">Add to favorites</span>
      </Button>
    </div>
  );
}

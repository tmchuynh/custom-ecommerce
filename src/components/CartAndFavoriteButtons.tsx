"use client";

import { useCart } from "@/app/context/cartContext";
import { ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { JSX, useState } from "react";
import { toast } from "sonner";
import QuantityButtons from "./Quantity";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useProduct } from "@/app/context/productContext";

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
  const { getProductByName } = useProduct();
  const [localQuantity, setLocalQuantity] = useState(1);
  const foundItem = getProductByName(product.name);
  const [hovered, setHovered] = useState(false);

  console.log("product", product);

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
      quantity: localQuantity,
      imageSrc: product.imageSrc,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className={cn("mt-5 pt-4 col-span-2 w-fit h-fit border", {
        "mt-0": page,
      })}
    >
      <div
        className={cn("flex items-end gap-5", {
          "flex-col items-start": !page,
        })}
      >
        <QuantityButtons
          product={product}
          localQuantity={localQuantity}
          setLocalQuantity={setLocalQuantity}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart(product, product.name);
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}

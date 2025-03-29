"use client";
import { useCart } from "@/app/context/cartContext";
import { ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { JSX, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import QuantityButtons from "./Quantity";
import { Button } from "./ui/button";

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
 * <AddToCartButtons product={myProduct} />
 *
 * @example
 * // Usage with page flag set to false (for use in cards or listings)
 * <AddToCartButtons product={myProduct} page={false} />
 */
export default function AddToCartButtons({
  product,
  page,
}: {
  product: ProductType;
  page: boolean;
}): JSX.Element {
  const { addToCart, getCartItem } = useCart();
  const [localQuantity, setLocalQuantity] = useState(1);
  const cartItem = getCartItem(product.name);

  /**
   * Handles adding a product to the cart.
   *
   * @param {any} product - The product to add to the cart.
   * @param {number} id - The ID of the product (using index as fallback).
   * @returns {void}
   */
  const handleAddToCart = (product: any, id: string): void => {
    addToCart({
      id: id,
      name: product.name,
      description: product.description,
      highlights: product.highlights,
      price: parseFloat(product.price.replace("$", "")),
      quantity: localQuantity,
      imageSrc: product.imageSrc,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className={cn("mt-5 pt-4 col-span-2 w-fit h-fit", {
        "mt-0": page,
      })}
    >
      <div className={"flex items-end gap-5"}>
        <QuantityButtons
          product={product}
          page={page}
          localQuantity={localQuantity}
          setLocalQuantity={setLocalQuantity}
        />
        {!cartItem &&
          (!page ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product, product.name);
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
          ) : (
            <Button
              size={"sm"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product, product.name);
              }}
            >
              <FaPlus /> Buy
            </Button>
          ))}
      </div>
    </div>
  );
}

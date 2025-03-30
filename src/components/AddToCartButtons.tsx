"use client";
import { useCart } from "@/app/context/cartContext";
import { ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart } from "lucide-react";
import { JSX, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import QuantityButtons from "./Quantity";
import { Button } from "./ui/button";
import { useAuth } from "@/app/context/authContext";
import { useWishlist } from "@/app/context/wishlistContext";

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

  const { user } = useAuth();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

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

  const handleWishlistClick = async () => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    try {
      if (!product) return;

      if (wishlistItems.some((item) => item.name === product.name)) {
        removeFromWishlist(product.name);
      } else {
        addToWishlist(product);
      }
      setInWishlist(!inWishlist);
    } catch (error) {
      console.error("Wishlist operation failed:", error);
    }
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
            <div className="flex gap-4">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(product, product.name);
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Button
                onClick={handleWishlistClick}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Heart
                  className={`h-5 w-5 ${
                    wishlistItems.some((item) => item.name === product.name)
                      ? "fill-red-500 text-red-500"
                      : ""
                  }`}
                />
                {wishlistItems.some((item) => item.name === product.name)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </Button>
            </div>
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

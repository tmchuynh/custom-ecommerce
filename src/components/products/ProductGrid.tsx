"use client";

import { useAuth } from "@/app/context/authContext";
import { useCart } from "@/app/context/cartContext";
import { useCurrency } from "@/app/context/currencyContext";
import { useWishlist } from "@/app/context/wishlistContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { displayRatingStars } from "@/lib/displayRatingStars";
import { ProductItem } from "@/lib/interfaces/product";
import { cn } from "@/lib/utils";
import { Check, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ProductGridProps {
  products: ProductItem[];
  viewMode?: "grid" | "list";
}

export default function ProductGrid({
  products,
  viewMode = "grid",
}: ProductGridProps) {
  const { formatPrice } = useCurrency();
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isLoggedIn } = useAuth();

  const toggleWishlist = async (product: ProductItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.error("Please log in to add items to your wishlist");
      return;
    }

    if (isInWishlist(product.id)) {
      const result = await removeFromWishlist(product.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } else {
      const result = await addToWishlist(product);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleAddToCart = (product: ProductItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wasInCart = isInCart(product.id);
    addToCart(product);

    if (wasInCart) {
      toast.success(`Added another ${product.title} to cart!`);
    } else {
      toast.success(`${product.title} added to cart!`);
    }
  };

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg duration-300 transition-all overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative h-48 sm:h-32 sm:w-48 overflow-hidden sm:shrink-0">
                  <Image
                    src={
                      product.images?.[0] ||
                      product.thumbnail ||
                      "/placeholder-image.jpg"
                    }
                    alt={product.title}
                    fill
                    className="duration-300 transition-transform object-cover group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                  {product.discountPercentage &&
                    product.discountPercentage > 0 && (
                      <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600">
                        -{Math.round(product.discountPercentage)}%
                      </Badge>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="mt-1 capitalize text-muted-foreground text-sm">
                          {product.category}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => toggleWishlist(product, e)}
                        className="ml-2 shrink-0"
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            isInWishlist(product.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          )}
                        />
                      </Button>
                    </div>

                    <p className="mb-3 text-muted-foreground text-sm line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex gap-4 items-center mb-3">
                      {product.rating && (
                        <div className="flex gap-1 items-center">
                          <div className="flex">
                            {displayRatingStars(product.rating)}
                          </div>
                          <span className="text-muted-foreground text-sm">
                            ({product.rating})
                          </span>
                        </div>
                      )}
                      {product.brand && (
                        <Badge variant="outline" className="text-xs">
                          {product.brand}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-primary text-xl">
                        {formatPrice(product.price)}
                      </span>
                      {product.discountPercentage &&
                        product.discountPercentage > 0 && (
                          <span className="line-through text-muted-foreground text-sm">
                            {formatPrice(
                              product.price /
                                (1 - product.discountPercentage / 100)
                            )}
                          </span>
                        )}
                    </div>
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={(e) => handleAddToCart(product, e)}
                      variant={isInCart(product.id) ? "classic" : "modern"}
                    >
                      {isInCart(product.id) ? (
                        <>
                          <Check className="h-4 w-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group hover:shadow-xl p-0 border-border duration-300 transition-all overflow-hidden"
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-square">
            <Image
              src={
                product.images?.[0] ||
                product.thumbnail ||
                "/placeholder-image.jpg"
              }
              alt={product.title}
              className="duration-300 transition-transform object-cover group-hover:scale-105"
              width={500}
              height={500}
            />
            {product.discountPercentage && product.discountPercentage > 0 && (
              <Badge className="absolute left-3 top-3 bg-red-500 hover:bg-red-600 shadow-lg text-white">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => toggleWishlist(product, e)}
              className="absolute right-3 top-3 backdrop-blur-sm bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
                )}
              />
            </Button>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-4 h-[17em] max-h-1/2">
            <div>
              <div className="mb-2">
                <h3 className="mb-1 font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h3>
                <p className="capitalize text-muted-foreground text-sm">
                  {product.category}
                </p>
              </div>
              {product.rating && (
                <div className="flex gap-1 items-center mb-3">
                  <div className="flex">
                    {displayRatingStars(product.rating)}
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({product.rating})
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.discountPercentage &&
                  product.discountPercentage > 0 && (
                    <span className="line-through text-muted-foreground text-sm">
                      {formatPrice(
                        product.price / (1 - product.discountPercentage / 100)
                      )}
                    </span>
                  )}
              </div>
              {product.brand && (
                <Badge variant="outline" className="text-xs">
                  {product.brand}
                </Badge>
              )}
            </div>

            <Button
              className="gap-2 w-full transition-colors"
              onClick={(e) => handleAddToCart(product, e)}
              variant={isInCart(product.id) ? "classic" : "modern"}
            >
              {isInCart(product.id) ? (
                <>
                  <Check className="h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

"use client";

import { useCurrency } from "@/app/context/currencyContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { displayRatingStars } from "@/lib/displayRatingStars";
import { ProductItem } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { formatToSlug } from "@/lib/utils/format";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductGridProps {
  products: ProductItem[];
  viewMode?: "grid" | "list";
}

export default function ProductGrid({
  products,
  viewMode = "grid",
}: ProductGridProps) {
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const toggleWishlist = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <CardContent className="p-0">
              <Link
                href={`/shopping/${product.category}/${formatToSlug(
                  product.title
                )}`}
              >
                <div className="flex sm:flex-row flex-col">
                  {/* Image */}
                  <div className="relative sm:w-48 h-48 sm:h-32 overflow-hidden sm:shrink-0">
                    <Image
                      src={
                        product.images?.[0] ||
                        product.thumbnail ||
                        "/placeholder-image.jpg"
                      }
                      alt={product.title}
                      fill
                      className="transition-transform duration-300 object-cover group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 192px"
                    />
                    {product.discountPercentage &&
                      product.discountPercentage > 0 && (
                        <Badge className="top-2 left-2 absolute bg-red-500 hover:bg-red-600">
                          -{Math.round(product.discountPercentage)}%
                        </Badge>
                      )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 justify-between p-4">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                          <p className="mt-1 text-muted-foreground text-sm capitalize">
                            {product.category}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="ml-2 shrink-0"
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4",
                              wishlist.has(product.id)
                                ? "fill-red-500 text-red-500"
                                : ""
                            )}
                          />
                        </Button>
                      </div>

                      <p className="mb-3 text-muted-foreground text-sm line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-4 mb-3">
                        {product.rating && (
                          <div className="flex items-center gap-1">
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

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary text-xl">
                          {formatPrice(product.price)}
                        </span>
                        {product.discountPercentage &&
                          product.discountPercentage > 0 && (
                            <span className="text-muted-foreground text-sm line-through">
                              {formatPrice(
                                product.price /
                                  (1 - product.discountPercentage / 100)
                              )}
                            </span>
                          )}
                      </div>
                      <Button size="sm" className="gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
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
          className="group hover:shadow-xl p-0 border-border transition-all duration-300 overflow-hidden"
          onClick={() =>
            router.push(
              `/shopping/${product.category}/${formatToSlug(product.title)}`
            )
          }
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
              className="transition-transform duration-300 object-cover group-hover:scale-105"
              width={500}
              height={500}
            />
            {product.discountPercentage && product.discountPercentage > 0 && (
              <Badge className="top-3 left-3 absolute bg-red-500 hover:bg-red-600 shadow-lg text-white">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => toggleWishlist(product.id, e)}
              className="top-3 right-3 absolute bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 backdrop-blur-sm"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  wishlist.has(product.id) ? "fill-red-500 text-red-500" : ""
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
                <p className="text-muted-foreground text-sm capitalize">
                  {product.category}
                </p>
              </div>
              {product.rating && (
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {displayRatingStars(product.rating)}
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({product.rating})
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.discountPercentage &&
                  product.discountPercentage > 0 && (
                    <span className="text-muted-foreground text-sm line-through">
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

            <Button className="gap-2 group-hover:bg-primary/90 w-full transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

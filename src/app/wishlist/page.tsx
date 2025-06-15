"use client";

import { useWishlist } from "@/app/context/wishlistContext";
import { useCart } from "@/app/context/cartContext";
import { useAuth } from "@/app/context/authContext";
import { useCurrency } from "@/app/context/currencyContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { displayRatingStars } from "@/lib/displayRatingStars";
import { Heart, ShoppingCart, Trash2, PackageCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const { activeWishlistItems, purchasedItems, removeFromWishlist, isLoading } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  // Redirect if not logged in
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your Wishlist</h1>
          <p className="text-gray-600 mb-6">Please log in to view your wishlist</p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleMoveToCart = async (productId: number) => {
    const wishlistItem = activeWishlistItems.find(item => item.id === productId);
    if (!wishlistItem) return;

    // Add to cart
    addToCart(wishlistItem.product);
    
    // Remove from wishlist
    const result = await removeFromWishlist(productId);
    if (result.success) {
      toast.success("Item moved to cart");
    } else {
      toast.error(result.message);
    }
  };

  const handleRemoveFromWishlist = async (productId: number) => {
    const result = await removeFromWishlist(productId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  if (activeWishlistItems.length === 0 && purchasedItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your Wishlist</h1>
          <p className="text-gray-600 mb-6">You haven't added any items to your wishlist yet</p>
          <Button asChild>
            <Link href="/shopping">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Wishlist</h1>
        <p className="text-gray-600">
          {activeWishlistItems.length} {activeWishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
        </p>
      </div>

      {/* Active Wishlist Items */}
      {activeWishlistItems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Wishlist Items</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activeWishlistItems.map((wishlistItem) => {
              const { product } = wishlistItem;
              return (
                <Card key={product.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          width={300}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Discount Badge */}
                    {product.discountPercentage && product.discountPercentage > 0 && (
                      <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 shadow-lg text-white">
                        -{Math.round(product.discountPercentage)}%
                      </Badge>
                    )}

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 backdrop-blur-sm"
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold line-clamp-2 min-h-[2.5rem]">
                        {product.title}
                      </h3>
                      {product.brand && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          {product.brand}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {displayRatingStars(product.rating)}
                        </div>
                        <span className="text-sm text-gray-500">({product.rating})</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.discountPercentage && product.discountPercentage > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(
                            product.price / (1 - product.discountPercentage / 100)
                          )}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleMoveToCart(product.id)}
                        className="w-full"
                        disabled={isLoading}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {isInCart(product.id) ? "Already in Cart" : "Move to Cart"}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Added {new Date(wishlistItem.addedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Purchased Items */}
      {purchasedItems.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <PackageCheck className="h-5 w-5" />
            Previously Purchased ({purchasedItems.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {purchasedItems.map((wishlistItem) => {
              const { product } = wishlistItem;
              return (
                <Card key={`purchased-${product.id}`} className="opacity-75">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    
                    <Badge className="absolute top-3 left-3 bg-green-500">
                      <PackageCheck className="h-3 w-3 mr-1" />
                      Purchased
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Purchased {wishlistItem.purchasedAt?.toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

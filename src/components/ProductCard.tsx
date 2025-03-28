import { Heart, Eye, ShoppingCart, Star, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/app/context/cartContext";
import { toast } from "sonner";

const ProductCard = ({
  product,
  gender,
  category,
  toggleWishlist,
  wishlist,
}: {
  product: any;
  gender: string;
  category: string;
  toggleWishlist: (id: string, e: React.MouseEvent) => void;
  wishlist: Set<string>;
}): JSX.Element => {
  const { addToCart, updateQuantity, removeFromCart, getCartItem } = useCart();

  const [hovered, setHovered] = useState(false);
  const cartItem = getCartItem(product.id);

  const handleAddToCart = (): void => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price.replace("$", "")),
      quantity: 1,
      imageSrc: product.imageSrc,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleIncreaseQuantity = (): void => {
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + 1);
      toast.success(`Increased quantity of ${product.name}`);
    }
  };

  const handleDecreaseQuantity = (): void => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(cartItem.id, cartItem.quantity - 1);
      toast.success(`Decreased quantity of ${product.name}`);
    } else if (cartItem && cartItem.quantity === 1) {
      handleRemoveFromCart();
    }
  };

  const handleRemoveFromCart = (): void => {
    if (cartItem) {
      removeFromCart(cartItem.id);
      toast.success(`${product.name} removed from cart!`);
    }
  };

  const formatItemType = (itemType: string) => {
    return itemType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/shopping/${gender}/${category}/${product.itemType}`}
        className="relative overflow-hidden aspect-square"
      >
        <Image
          src={
            product.imageSrc ||
            "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1742&auto=format&fit=crop"
          }
          alt={product.name}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick Action Buttons */}
        <div
          className={cn(
            "absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300",
            {
              "opacity-100": hovered,
              "opacity-0": !hovered,
            }
          )}
        >
          <button
            onClick={(e) => toggleWishlist(product.id, e)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                wishlist.has(product.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </button>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Eye className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Item Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
            {formatItemType(product.itemType)}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-gray-800 font-medium text-lg mb-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating || 4)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviewCount || 12})
            </span>
          </div>
          <span className="text-lg font-semibold text-blue-600">
            {formatCurrency(product.price || 99.99)}
          </span>
        </div>

        {/* Cart Actions */}
        {cartItem ? (
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecreaseQuantity}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-gray-800 font-medium">
                {cartItem.quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              onClick={handleRemoveFromCart}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center"
            >
              <Trash className="h-4 w-4 mr-1" /> Remove
            </button>
          </div>
        ) : (
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-full font-medium flex items-center justify-center hover:bg-blue-700 transition-colors mt-4"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

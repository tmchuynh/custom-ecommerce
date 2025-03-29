import {
  Heart,
  Eye,
  ShoppingCart,
  Star,
  Trash,
  Clock,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";
import { cn, formatCurrency, formatURL } from "@/lib/utils";
import { useCart } from "@/app/context/cartContext";
import { toast } from "sonner";
import ProductHighlights from "./ProductHighlights";
import CartAndFavoritesButtons from "./CartAndFavoriteButtons";
import { useProduct } from "@/app/context/productContext";

const ProductCard = ({
  product,
  gender,
  category,
  item,
  toggleWishlist,
  wishlist,
}: {
  product: any;
  gender: string;
  category: string;
  item: string;
  toggleWishlist: (id: string, e: React.MouseEvent) => void;
  wishlist: Set<string>;
}): JSX.Element => {
  const [hovered, setHovered] = useState(false);
  const { getProductByName, convertPrice } = useProduct();

  const foundItem = getProductByName(product.name);
  console.log("foundItem", foundItem);

  return (
    <div
      key={product.id}
      className="group border-2 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-square">
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
        <div className="absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
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
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors">
            <Eye className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Product Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
              New
            </span>
          )}
          {product.isSale && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
              Sale
            </span>
          )}
          {product.isLimited && (
            <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded flex items-center">
              <Clock className="h-3 w-3 mr-1" /> Limited
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-gray-800 font-medium text-lg mb-1 transition-colors">
          <Link
            href={`/shopping/${gender}/${category}/${formatURL(product.name)}`}
          >
            {product.name}
          </Link>
        </h3>

        <div className="flex items-center justify-between mb-2">
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
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-semibold text-blue-600">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>

        <ProductHighlights highlights={product.highlights} />

        <div className="text-sm text-gray-500 capitalize flex items-center">
          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
            {item ? <>{item as string}</> : <>{category as string}</>}
          </span>
          {product.isLimited && (
            <span className="ml-2 text-amber-600 flex items-center text-xs">
              <TrendingUp className="h-3 w-3 mr-1" /> Trending
            </span>
          )}
        </div>

        {/* Add to Cart Button - Appears on Hover */}
        {foundItem && (
          <CartAndFavoritesButtons product={foundItem} page={false} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;

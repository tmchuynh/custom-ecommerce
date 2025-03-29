import { useCurrency } from "@/app/context/CurrencyContext";
import { useProduct } from "@/app/context/productContext";
import { formatCurrency, formatItemName, formatURL } from "@/lib/utils";
import { Clock, Eye, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useMemo } from "react";
import AddToCartButtons from "./AddToCartButtons";
import { Badge } from "./ui/badge";
import ProductRate from "./ProductRate";
import QuickLookAndFavoriteButtons from "./QuickLookAndFavoriteButtons";

const ProductCard = ({
  product,
  gender,
  category,
  item,
  page,
  toggleWishlist,
  wishlist,
}: {
  product: any;
  gender: string;
  category: string;
  item: string;
  page: boolean;
  toggleWishlist: (id: string, e: React.MouseEvent) => void;
  wishlist: Set<string>;
}): JSX.Element => {
  const { getProductByName, convertPrice } = useProduct();
  const { selectedCurrency } = useCurrency();

  const foundItem = getProductByName(product.name);

  const displayPrice = useMemo(() => {
    if (!product?.price || typeof convertPrice !== "function") {
      console.warn("Price or convertPrice function is unavailable.");
      return "";
    }

    try {
      return convertPrice(product.price, selectedCurrency);
    } catch (error) {
      console.error("Error converting price:", error);
      return product.price?.toString() || ""; // Fallback to original price if conversion fails
    }
  }, [product?.price, convertPrice, selectedCurrency]);

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
          <QuickLookAndFavoriteButtons
            product={product}
            page={page}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        </div>

        {/* Product Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant={"secondary"} className="px-2 py-1 rounded text-xs">
            {item ? (
              <>{formatItemName(item as string)}</>
            ) : (
              <>{formatItemName(category as string)}</>
            )}
          </Badge>
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
        <h3 className="font-medium text-lg mb-1 transition-colors">
          <Link
            href={`/shopping/${gender}/${category}/${formatURL(product.name)}`}
          >
            {product.name}
          </Link>
        </h3>

        <div className="flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-sm line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
          <span className="text-lg font-semibold text-blue-600">
            {product.displayPrice || displayPrice}
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <ProductRate page={page} />
          </div>
        </div>

        {/* Add to Cart Button - Appears on Hover */}
        {foundItem && <AddToCartButtons product={foundItem} page={true} />}
      </div>
    </div>
  );
};

export default ProductCard;

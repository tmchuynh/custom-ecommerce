import { useCurrency } from "@/app/context/currencyContext";
import { useProduct } from "@/app/context/productContext";
import { formatItemName, formatURL } from "@/lib/utils/utils";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useMemo } from "react";
import AddToCartButtons from "../../buttons/AddToCartButtons";
import QuickLookAndFavoriteButtons from "../../buttons/QuickLookAndFavoriteButtons";
import { Badge } from "../../ui/badge";
import ProductRate from "./ProductRate";

/**
 * A component that displays a product card with image, price, badges, and interactive elements.
 *
 * @component
 * @param {Object} props - The component props
 * @param {any} props.product - The product object containing details like name, price, images etc.
 * @param {string} props.gender - The gender category of the product
 * @param {string} props.category - The main category of the product
 * @param {string} props.item - The specific item type/subcategory
 * @param {boolean} props.page - Flag indicating if card is displayed on a product page
 *
 * @returns {JSX.Element} A product card component with:
 * - Product image with hover zoom effect
 * - Quick action buttons (visible on hover)
 * - Product badges (New, Sale, Limited)
 * - Product name with link
 * - Price display (with original price if on sale)
 * - Rating display
 * - Add to cart button
 *
 * @example
 * ```tsx
 * <ProductCard
 *   product={productData}
 *   gender="mens"
 *   category="clothing"
 *   item="shirts"
 *   page={false}
 * />
 * ```
 */
const ProductCard = ({
  product,
  gender,
  category,
  item,
  page,
}: {
  product: any;
  gender: string;
  category: string;
  item: string;
  page: boolean;
}): JSX.Element => {
  const { getProductByName, convertPrice } = useProduct();
  const { formatCurrency } = useCurrency();
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
          <QuickLookAndFavoriteButtons product={product} page={page} />
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
              {formatCurrency(product.originalPrice, selectedCurrency.code)}
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

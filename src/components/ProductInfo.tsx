import { useCart } from "@/app/context/cartContext";
import { ProductType } from "@/lib/types";
import { cn, formatURL } from "@/lib/utils";
import { JSX, useEffect, useMemo, useState } from "react";
import CartAndFavoritesButtons from "./CartAndFavoriteButtons";
import ProductRate from "./ProductRate";
import ProductHighlights from "./ProductHighlights";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useProduct } from "@/app/context/productContext";
import { useCurrency } from "@/app/context/CurrencyContext";

/**
 * Component for displaying detailed information about a product.
 *
 * @param {Object} props - The props object.
 * @param {ProductType} props.product - The product data to display.
 * @param {boolean} [props.page=true] - Determines if the component is displayed on a full page or as part of a smaller section.
 * @param {string} [props.titleSize="text-4xl"] - The CSS class for the product title's font size.
 * @param {string} [props.priceSize="text-3xl"] - The CSS class for the product price's font size.
 * @param {boolean} props.relatedProduct - Indicates if the product is being displayed as a related product.
 * @param {string} [props.selectedGender=""] - The selected gender category for the product.
 * @param {string} [props.selectedCategory=""] - The selected category for the product.
 * @param {string} [props.selectedItem=""] - The selected subcategory or item for the product.
 * @param {boolean} [props.showColors=true] - Determines if the color options for the product should be displayed.
 * @param {boolean} [props.showButtons=true] - Determines if the action buttons (e.g., add to cart, add to favorites) should be displayed.
 *
 * @returns {JSX.Element} The rendered ProductInfo component.
 *
 * @remarks
 * - The component dynamically generates a URL for the product based on its properties.
 * - If `selectedItem` is not provided, the URL is derived using the `getProductByName` function.
 * - The component conditionally renders color options and action buttons based on the `showColors` and `showButtons` props.
 *
 * @example
 * ```tsx
 * <ProductInfo
 *   product={productData}
 *   page={true}
 *   titleSize="text-2xl"
 *   priceSize="text-xl"
 *   relatedProduct={false}
 *   selectedGender="men"
 *   selectedCategory="shoes"
 *   selectedItem="sneakers"
 *   showColors={true}
 *   showButtons={true}
 * />
 * ```
 */
const ProductInfo = ({
  product,
  page = true,
  titleSize = "text-4xl",
  priceSize = "text-3xl",
  relatedProduct = false,
  selectedGender = "",
  selectedCategory = "",
  selectedItem = "",
  showColors = true,
  showButtons = true,
}: {
  product: ProductType;
  page?: boolean;
  titleSize?: string;
  priceSize?: string;
  relatedProduct: boolean;
  selectedGender?: string;
  selectedCategory?: string;
  selectedItem?: string;
  showColors?: boolean;
  showButtons?: boolean;
}): JSX.Element => {
  const { getProductByName, convertPrice } = useProduct();
  const { selectedCurrency } = useCurrency(); // Add this to trigger re-renders when currency changes
  const [url, setURL] = useState(
    `/shopping/${selectedGender}/${selectedCategory}/${selectedItem.toLowerCase()}/${formatURL(
      product.name
    )}`
  );
  const [highlights, setHighlights] = useState<string[]>(
    product.highlights || []
  );
  const [displayPrice, setDisplayPrice] = useState(product.price || "");

  const pathname = usePathname();

  const pathSegments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  // Update the price when the currency changes
  useEffect(() => {
    if (product.price) {
      // Extract the numeric price value from the product
      const originalPrice =
        typeof product.price === "string"
          ? product.price
          : String(product.price);

      // Convert to the current selected currency
      setDisplayPrice(convertPrice(originalPrice));
    }
  }, [product.price, selectedCurrency, convertPrice]);

  // Use useEffect to handle URL updates and fetch highlights if needed
  useEffect(() => {
    if (!selectedItem || highlights.length === 0) {
      const productDetails = getProductByName(product.name);

      if (productDetails) {
        // Only update highlights if we found some and current highlights are empty
        if (productDetails.highlights && productDetails.highlights.length > 0) {
          setHighlights(productDetails.highlights);
        }

        setURL(
          `/shopping/${productDetails.gender}/${productDetails.category}/${
            productDetails.subcategory
          }/${formatURL(productDetails.name)}`
        );
      } else if (product.gender && product.category) {
        // If product has direct gender and category properties (for category cards)
        setURL(`/shopping/${product.gender}/${product.category}`);
      }
    }
  }, [
    product.name,
    product.gender,
    product.category,
    selectedItem,
    getProductByName,
    highlights.length,
  ]);

  return (
    <div
      className={cn("mt-5 px-1 grid grid-cols-1 w-11/12 mx-auto", {
        "bg-accent mt-8": relatedProduct,
        "w-full": !page,
      })}
    >
      <div
        className={cn(
          "grid grid-cols-subgrid grid-col-7 grid-flow-row h-full",
          {
            "gap-2": pathSegments.length === 2,
            "gap-0": pathSegments.length === 3,
          }
        )}
      >
        <h2 className="sr-only">Product information</h2>
        <h1
          className={cn(`${titleSize} text-pretty`, {
            "font-bold w-10/12 pr-2": relatedProduct,
          })}
        >
          <Link href={url} className="hover:underline underline-offset-2">
            {product.name}
          </Link>
        </h1>

        {typeof window !== "undefined" &&
          window.location.pathname.split("/").filter(Boolean).length > 2 &&
          window.location.pathname.startsWith("/shopping/") && (
            <div className="flex items-center gap-2 my-2">
              <p
                className={cn(`${priceSize} tracking-tight pr-4`, {
                  "mt-0": relatedProduct,
                })}
              >
                {displayPrice}
              </p>
              <ProductRate />
            </div>
          )}
        <p
          className={cn("mb-5", {
            "hidden mt-0": relatedProduct,
          })}
        >
          {product.description}
        </p>
      </div>

      <div className="row-span-1 h-full">
        {(showColors || showButtons) && (
          <div
            className={cn("absolute bottom-5 grid grid-cols-1 gap-2", {
              relative: !page,
            })}
          >
            <ProductHighlights highlights={highlights} />

            {showButtons &&
              typeof window !== "undefined" &&
              window.location.pathname.split("/").filter(Boolean).length > 2 &&
              window.location.pathname.startsWith("/shopping/") && (
                <CartAndFavoritesButtons product={product} page={page} />
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;

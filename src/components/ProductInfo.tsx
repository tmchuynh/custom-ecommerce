import { useCurrency } from "@/app/context/CurrencyContext";
import { useProduct } from "@/app/context/productContext";
import { ProductType } from "@/lib/types";
import { cn, formatURL } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, useEffect, useMemo, useState } from "react";
import AddToCartButtons from "./AddToCartButtons";
import ProductRate from "./ProductRate";
import { Button } from "./ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import { toast } from "sonner";
import QuantityButtons from "./Quantity";

/**
 * A component that displays detailed information about a product.
 *
 * @component
 * @param {Object} props - The component props
 * @param {ProductType} props.product - The product object containing details to display
 * @param {boolean} [props.page=true] - Whether this is displayed on a full product page
 * @param {string} [props.titleSize="text-4xl"] - CSS class for title text size
 * @param {string} [props.priceSize="text-3xl"] - CSS class for price text size
 * @param {boolean} props.relatedProduct - Whether this is displayed as a related product
 * @param {string} [props.selectedGender=""] - Currently selected gender filter
 * @param {string} [props.selectedCategory=""] - Currently selected category filter
 * @param {string} [props.selectedItem=""] - Currently selected item
 * @param {boolean} [props.showColors=true] - Whether to show color options
 * @param {boolean} [props.showButtons=true] - Whether to show add to cart buttons
 *
 * @returns {JSX.Element} A product information card containing name, price, description,
 * highlights, and optional add to cart functionality
 *
 * @example
 * <ProductInfo
 *   product={productData}
 *   relatedProduct={false}
 *   showColors={true}
 *   showButtons={true}
 * />
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
  const { addToCart, getCartItem } = useCart();
  const cartItem = getCartItem(product.name);
  const { selectedCurrency } = useCurrency();
  const [url, setURL] = useState(
    `/shopping/${selectedGender}/${selectedCategory}/${formatURL(product.name)}`
  );
  const [highlights, setHighlights] = useState<string[]>(
    product.highlights || []
  );
  const [localQuantity, setLocalQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  /**
   * Memoized value that converts and formats the product price based on the selected currency.
   *
   * @returns {string} The formatted price in the selected currency.
   * If price conversion fails, returns the original price as a string.
   * Returns empty string if price or conversion function is unavailable.
   *
   * @remarks
   * - Recalculates when product price, currency converter, or selected currency changes
   * - Logs warning if price/converter is unavailable
   * - Logs error if price conversion fails
   */
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

  const pathname = usePathname();

  const pathSegments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  useEffect(() => {
    if (!selectedItem || highlights.length === 0) {
      const productDetails = getProductByName(product.name);

      if (productDetails) {
        // Only update highlights if we found some and current highlights are empty
        if (productDetails.highlights && productDetails.highlights.length > 0) {
          setHighlights(productDetails.highlights);
        }

        setURL(
          `/shopping/${productDetails.gender}/${
            productDetails.category
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
      className={cn("mt-10 px-2 grid grid-cols-1 w-11/12 mx-auto", {
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
                {product.displayPrice || displayPrice}
              </p>
              <ProductRate page={page} />
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
        {page ? (
          <div
            className={cn("absolute bottom-5 grid grid-cols-1 gap-2", {
              relative: !page,
            })}
          >
            {typeof window !== "undefined" &&
              window.location.pathname.split("/").filter(Boolean).length > 2 &&
              window.location.pathname.startsWith("/shopping/") && (
                <AddToCartButtons product={product} page={page} />
              )}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-end sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <QuantityButtons
              product={product}
              page={page}
              localQuantity={localQuantity}
              setLocalQuantity={setLocalQuantity}
            />
            {!cartItem && (
              <Button
                className="flex-1 flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(product, product.name);
                }}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            )}
            <Button
              variant="outline"
              onClick={toggleWishlist}
              className={`flex-1 flex items-center justify-center ${
                inWishlist ? "bg-pink-50 border-pink-200 text-pink-700" : ""
              }`}
            >
              <Heart
                className={`h-5 w-5 mr-2 ${
                  inWishlist ? "fill-pink-500 text-pink-500" : ""
                }`}
              />
              {inWishlist ? "Added to Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;

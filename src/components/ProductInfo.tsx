import { useCart } from "@/app/context/cartContext";
import { ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { JSX, useEffect, useState } from "react";
import CartAndFavoritesButtons from "./CartAndFavoriteButtons";
import ProductBadges from "./ProductBadges";
import ProductRate from "./ProductRate";

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
  const { getProductByName } = useCart();
  const [url, setURL] = useState(
    `/shopping/${selectedGender}/${selectedCategory}/${selectedItem}/${product.name
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("'s", "")}`
  );

  // Use useEffect to handle URL updates to prevent infinite renders
  useEffect(() => {
    if (!selectedItem) {
      const productDetails = getProductByName(product.name);
      if (productDetails) {
        setURL(
          `/shopping/${productDetails.gender}/${productDetails.category}/${
            productDetails.subcategory
          }/${productDetails.name
            .toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll("'s", "")}`
        );
      }
    }
  }, [product.name, selectedItem, getProductByName]);

  return (
    <div
      className={cn("mt-5 px-1 w-11/12 mx-auto grid grid-cols-1 p-2", {
        "bg-accent mt-8": relatedProduct,
        "w-full": !page,
      })}
    >
      <div className="grid grid-cols-subgrid grid-col-7 grid-flow-row">
        <h2 className="sr-only">Product information</h2>
        <h1
          className={cn(`${titleSize} text-pretty`, {
            "font-bold w-10/12 pr-2": relatedProduct,
          })}
        >
          <a href={url} className="hover:underline underline-offset-2">
            {product.name}
          </a>
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <p
            className={cn(`${priceSize} tracking-tight pr-4`, {
              "mt-0": relatedProduct,
            })}
          >
            {product.price}
          </p>
          <ProductRate />
        </div>
        <ProductBadges />
        <p
          className={cn("mt-3", {
            "hidden mt-0": relatedProduct,
          })}
        >
          {product.description}
        </p>
      </div>

      <div className="row-span-1 h-full">
        {(showColors || showButtons) && (
          <div className={cn("absolute bottom-5", { relative: !page })}>
            {showButtons && (
              <CartAndFavoritesButtons product={product} page={page} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;

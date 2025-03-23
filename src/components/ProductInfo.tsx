import { useCart } from "@/app/context/cartContext";
import { Color, ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Radio, RadioGroup } from "@headlessui/react";
import React, { JSX, useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { mockProductData } from "@/lib/mockProductData";
import { useCart } from "@/app/context/cartContext";
import components from "./ProductDetails";
import { Button } from "./ui/button";
import CartAndFavoritesButtons from "./CartAndFavoriteButtons";
import ProductBadges from "./ProductBadges";
import ProductRate from "./ProductRate";

/**
 * The `ProductInfo` component displays detailed information about a product,
 * including its name, price, available colors, and actions to add the product
 * to the shopping bag or favorites list.
 *
 * @param {Object} props - The props object.
 * @param {ProductType} props.product - The product object containing details such as name, price, and available colors.
 * @param {Color} props.selectedColor - The currently selected color for the product.
 * @param {React.Dispatch<React.SetStateAction<Color>>} props.setSelectedColor - A state setter function to update the selected color.
 *
 * @returns {JSX.Element} A React component that renders the product information and actions.
 *
 * @example
 * ```tsx
 * <ProductInfo
 *   product={product}
 *   selectedColor={selectedColor}
 *   setSelectedColor={setSelectedColor}
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

  const [selectedColor, setSelectedColor] = useState<Color>({
    bgColor: "#000000",
    name: "Black",
  });

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
          <div className="flex items-center">
            <svg
              className="h-4 w-4 text-yellow-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>

            <svg
              className="h-4 w-4 text-yellow-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>

            <svg
              className="h-4 w-4 text-yellow-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>

            <svg
              className="h-4 w-4 text-yellow-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>

            <svg
              className="h-4 w-4 text-yellow-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>
          </div>

          <p className="text-sm font-medium">4.9</p>
          <p className="text-sm font-medium">(1,233)</p>
        </div>
        <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
            <p className="text-sm font-medium">Best Seller</p>
          </li>

          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            <p className="text-sm font-medium">Best Price</p>
          </li>
        </ul>
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
              <CartAndFavoritesButtons
                product={product}
                page={page}
                relatedProduct={relatedProduct}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;

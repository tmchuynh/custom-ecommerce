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
  titleSize = "text-4xl",
  priceSize = "text-3xl",
  relatedProduct = false,
  selectedGender = "",
  selectedCategory = "",
  selectedItem = "",
}: {
  product: ProductType;
  titleSize?: string;
  priceSize?: string;
  relatedProduct?: boolean;
  selectedGender?: string;
  selectedCategory?: string;
  selectedItem?: string;
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
      className={cn("mt-5 px-4 mb-5 grid grid-rows-4 h-[20em]", {
        "bg-accent w-10/12 mx-auto mt-8": relatedProduct,
      })}
    >
      <div className="flex flex-col justify-start row-span-3">
        <h2 className="sr-only">Product information</h2>
        <h1
          className={cn(`${titleSize} font-extrabold pt-10`, {
            "font-bold w-10/12 pr-2 text-pretty text-2xl": relatedProduct,
          })}
        >
          <a href={url}>{product.name}</a>
        </h1>
        <p
          className={cn("mt-3", {
            "hidden mt-0": relatedProduct,
          })}
        >
          {product.description}
        </p>
      </div>

      <div
        className={cn("mt-3 row-span-1", {
          "mt-0": relatedProduct,
        })}
      >
        <p
          className={cn(`${priceSize} tracking-tight mt-4`, {
            "mt-0": relatedProduct,
          })}
        >
          {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;

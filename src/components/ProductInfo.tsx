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
  selectedColor,
  titleSize = "text-4xl",
  priceSize = "text-3xl",
  relatedProduct = false,
  selectedGender = "",
  selectedCategory = "",
  selectedItem = "",
  setSelectedColor,
}: {
  product: ProductType;
  selectedColor: Color;
  titleSize?: string;
  priceSize?: string;
  relatedProduct?: boolean;
  selectedGender?: string;
  selectedCategory?: string;
  selectedItem?: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<Color>>;
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
    <div className="mt-5 px-4">
      <div
        className={cn("flex flex-col", {
          "w-11/12 mx-auto": relatedProduct,
        })}
      >
        <div
          className={cn("mb-5 ", {
            "flex items-start mt-8 justify-between": relatedProduct,
          })}
        >
          <h1
            className={cn(`${titleSize} font-extrabold`, {
              "font-bold w-10/12 pr-2 text-pretty text-2xl": relatedProduct,
            })}
          >
            <a href={url}>{product.name}</a>
          </h1>
          <div
            className={cn("mt-3", {
              "mt-0": relatedProduct,
            })}
          >
            <p
              className={cn("", {
                hidden: relatedProduct,
              })}
            >
              {product.description}
            </p>
            <h2 className="sr-only">Product information</h2>
            <p
              className={cn(`${priceSize} tracking-tight mt-4`, {
                "mt-0": relatedProduct,
              })}
            >
              {product.price}
            </p>
          </div>
        </div>

        <div>
          {product.colors.length > 0 && (
            <div className="mt-6">
              <h3
                className={cn("text-lg font-medium mb-4", {
                  hidden: relatedProduct,
                })}
              >
                Color
              </h3>
              <fieldset aria-label="Choose a color" className="mt-2">
                <RadioGroup
                  value={selectedColor}
                  onChange={(value: Color) => setSelectedColor(value)}
                  className="flex flex-wrap items-center gap-3"
                >
                  {product.colors.map((color: Color, index: number) => (
                    <div key={index} className="flex flex-col items-start">
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Radio
                              key={index}
                              value={color}
                              aria-label={color.name}
                              className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
                            >
                              <span
                                aria-hidden="true"
                                className="bg-dynamic size-8 rounded-full border"
                                style={
                                  {
                                    "--bg-color": color.bgColor,
                                  } as React.CSSProperties
                                }
                              />
                            </Radio>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{color.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

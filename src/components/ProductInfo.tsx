// components/ProductInfo.tsx
import React, { JSX } from "react";
import { RadioGroup, Radio } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ProductType, Color } from "@/lib/types";
import { Button } from "./ui/button";

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
  setSelectedColor,
}: {
  product: ProductType;
  selectedColor: Color;
  setSelectedColor: React.Dispatch<React.SetStateAction<Color>>;
}): JSX.Element => {
  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-4xl font-extrabold mb-8">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">{product.price}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Color</h3>
        <fieldset aria-label="Choose a color" className="mt-2">
          <RadioGroup
            value={selectedColor}
            onChange={setSelectedColor}
            className="flex items-center gap-x-3"
          >
            {product.colors.map((color: Color, index: number) => (
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
                          { "--bg-color": color.bgColor } as React.CSSProperties
                        }
                      />
                    </Radio>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{color.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </RadioGroup>
        </fieldset>
      </div>

      <div className="mt-10 flex">
        <Button type="submit">Add to bag</Button>

        <button
          type="button"
          className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        >
          <HeartIcon aria-hidden="true" className="size-6 shrink-0" />
          <span className="sr-only">Add to favorites</span>
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;

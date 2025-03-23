"use client";
import { Color, ProductType } from "@/lib/types";
import { cn, getAccessibleColor } from "@/lib/utils";
import { JSX, useState } from "react";
import CartAndFavoritesButtons from "./CartAndFavoriteButtons";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import { Card, CardContent } from "./ui/card";
import components from "./ProductDetails";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

/**
 * A React component that renders a product card with details such as name, price, and an image.
 * It also provides functionality to add the product to the cart.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {any} props.product - The product object containing details like name, description, price, and image source.
 * @param {number} props.index - The index of the product in the list, used as a fallback ID.
 * @param {string} props.selectedGender - The selected gender category for filtering products.
 * @param {string} props.selectedCategory - The selected product category.
 * @param {string} props.selectedItem - The selected item type within the category.
 * @returns {JSX.Element} The rendered product card component.
 *
 * @example
 * <ProductCard
 *   product={{
 *     name: "T-Shirt",
 *     description: "A comfortable cotton t-shirt",
 *     price: "$19.99",
 *     imageSrc: "/images/tshirt.jpg"
 *   }}
 *   index={0}
 *   selectedGender="men"
 *   selectedCategory="clothing"
 *   selectedItem="t-shirts"
 * />
 */
const ProductCard = ({
  product,
  index,
  page = true,
  relatedProduct = false,
  cardClassName = "shadow-none rounded-3xl shadow-sm relative",
  contentClassName = "p-0 relative",
  infoContainerClassName = "-mt-9",
  colorsContainerClassName = "",
  titleSize = "text-2xl",
  priceSize = "text-xl",
  minHeight = "md:min-h-[40em]",
  showColors = true,
  showButtons = true,
}: {
  product: ProductType;
  index: number;
  page?: boolean;
  relatedProduct?: boolean;
  cardClassName?: string;
  contentClassName?: string;
  infoContainerClassName?: string;
  colorsContainerClassName?: string;
  titleSize?: string;
  priceSize?: string;
  minHeight?: string;
  showColors?: boolean;
  showButtons?: boolean;
}): JSX.Element => {
  const segments = window.location.pathname.split("/");
  const selectedGender = segments[2];
  const selectedCategory = segments[3];
  const selectedItem = segments[4];
  const [selectedColor, setSelectedColor] = useState<Color>({
    bgColor: "#000000",
    name: "Black",
  });
  const accessibleColor = getAccessibleColor(
    `${selectedColor.bgColor}`,
    "AAA",
    true
  );

  return (
    <>
      <Card
        className={cn(cardClassName, {
          "border border-border": page,
        })}
      >
        <div className="">
          <ProductGallery
            page={true}
            selectedColor={selectedColor}
            panelsVisibility={false}
          />

          <div className="mb-4 flex items-center justify-between gap-4">
            <Badge
              variant={"secondary"}
              className={cn("mb-0 mx-8 hover:bg-dynamic", {
                "absolute top-5 left-5 mx-0": page,
              })}
              style={
                selectedColor && accessibleColor
                  ? ({
                      "--bg-color": selectedColor.bgColor,
                      "--text-color": accessibleColor,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              Up to 15% off
            </Badge>

            <div className="flex items-center justify-end gap-1 p-2">
              <Button type="button" data-tooltip-target="tooltip-quick-look-2">
                <span> Quick look </span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-width="2"
                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-width="2"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Button>
              <div
                id="tooltip-quick-look-2"
                role="tooltip"
                className="tooltip invisible absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition-opacity duration-300"
                data-popper-placement="top"
              >
                Quick look
                <div className="tooltip-arrow" data-popper-arrow=""></div>
              </div>

              <Button
                type="button"
                data-tooltip-target="tooltip-add-to-favorites-2"
              >
                <span className="sr-only"> Add to Favorites </span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                  />
                </svg>
              </Button>
              <div
                id="tooltip-add-to-favorites-2"
                role="tooltip"
                className="tooltip invisible absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium opacity-0 shadow-sm transition-opacity duration-300"
                data-popper-placement="top"
              >
                Add to favorites
                <div className="tooltip-arrow" data-popper-arrow=""></div>
              </div>
            </div>
          </div>

          <ProductInfo
            product={product}
            titleSize={titleSize}
            priceSize={priceSize}
            relatedProduct={relatedProduct}
            selectedGender={selectedGender}
            selectedCategory={selectedCategory}
            selectedItem={selectedItem}
          />
        </div>
      </Card>
    </>
  );
};

export default ProductCard;

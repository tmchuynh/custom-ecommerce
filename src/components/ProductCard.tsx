"use client";
import { Color, ProductType } from "@/lib/types";
import { cn, getAccessibleColor } from "@/lib/utils";
import { useTheme } from "next-themes";
import { JSX, useEffect, useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import QuickLookAndFavoriteButtons from "./QuickLookAndFavoriteButtons";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

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
  cardClassName = "shadow-none rounded-3xl shadow-sm h-full mb-15 relative overflow-hidden",
  titleSize = "text-2xl",
  priceSize = "text-xl",
}: {
  product: ProductType;
  index: number;
  page?: boolean;
  relatedProduct?: boolean;
  cardClassName?: string;
  titleSize?: string;
  priceSize?: string;
}): JSX.Element => {
  const segments = window.location.pathname.split("/");
  const selectedGender = segments[2];
  const selectedCategory = segments[3];
  const selectedItem = segments[4];
  const [backgroundColor, setBackgroundColor] = useState<Color>({
    bgColor: "#000000",
    name: "Black",
  });
  const [selectedColor, setSelectedColor] = useState<Color>({
    bgColor: "#000000",
    name: "Black",
  });
  const accessibleColor = getAccessibleColor(
    `${backgroundColor.bgColor}`,
    "AAA",
    true
  );

  const { theme } = useTheme();

  useEffect(() => {
    // Only update when theme has a defined value
    if (theme !== undefined) {
      if (theme === "dark") {
        setBackgroundColor({
          bgColor: "#070707",
          name: "Black",
        });
      } else {
        setBackgroundColor({
          bgColor: "#fff",
          name: "White",
        });
      }
    }
  }, [theme]);

  return (
    <>
      <Card
        key={index}
        className={cn(cardClassName, {
          "border border-border": page,
        })}
      >
        <div>
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
          </div>
          <QuickLookAndFavoriteButtons page={page} />

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

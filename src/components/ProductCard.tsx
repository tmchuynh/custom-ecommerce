"use client";
import { Color, ProductType } from "@/lib/types";
import { cn, getAccessibleColor } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { JSX, useEffect, useMemo, useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import QuickLookAndFavoriteButtons from "./QuickLookAndFavoriteButtons";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

/**
 * A React component that renders a product card with customizable styles,
 * product information, and interactive elements such as a badge, quick look,
 * and favorite buttons. It also adapts its background color based on the
 * current theme.
 *
 * @param {Object} props - The props for the ProductCard component.
 * @param {ProductType} props.product - The product data to display in the card.
 * @param {number} props.index - The index of the product in the list.
 * @param {boolean} [props.page=true] - Determines if the card is displayed on a page or as a related product.
 * @param {boolean} [props.relatedProduct=false] - Indicates if the card is for a related product.
 * @param {string} [props.cardClassName="shadow-none rounded-3xl shadow-sm h-full mb-15 relative overflow-hidden"] - Custom CSS class names for the card.
 * @param {string} [props.titleSize="text-2xl"] - The CSS class for the product title size.
 * @param {string} [props.priceSize="text-xl"] - The CSS class for the product price size.
 *
 * @returns {JSX.Element} The rendered product card component.
 *
 * @remarks
 * - The component uses the `useTheme` hook to determine the current theme and adjusts the background color accordingly.
 * - The `ProductGallery`, `QuickLookAndFavoriteButtons`, and `ProductInfo` components are used to display product details and interactive elements.
 * - The badge displays a discount message and dynamically adjusts its background and text colors for accessibility.
 */
const ProductCard = ({
  product,
  index,
  page = true,
  badge = "",
  relatedProduct = false,
  cardClassName = "shadow-none rounded-3xl shadow-sm h-[40em] mb-15 relative overflow-hidden",
  titleSize = "text-2xl",
  priceSize = "text-xl",
}: {
  product: ProductType;
  index: number;
  page?: boolean;
  badge?: string;
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
  const pathname = usePathname();

  const pathSegments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  console.log("product from card", product);

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
          " h-[30em] w-full": pathSegments.length === 2,
          " h-[43em]": pathSegments.length === 3,
        })}
      >
        <div className="">
          <ProductGallery
            product={product}
            index={index}
            page={true}
            selectedColor={selectedColor}
            panelsVisibility={false}
          />

          {badge.length > 0 && (
            <div className="my-4 flex items-center justify-between gap-4">
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
                {badge}
              </Badge>
            </div>
          )}
          {pathSegments.length > 2 && pathSegments[0] === "shopping" && (
            <QuickLookAndFavoriteButtons page={page} />
          )}
          <ProductInfo
            product={product}
            titleSize={titleSize}
            priceSize={priceSize}
            relatedProduct={relatedProduct}
            selectedGender={selectedGender || ""}
            selectedCategory={selectedCategory || ""}
            selectedItem={selectedItem || ""}
          />
        </div>
      </Card>
    </>
  );
};

export default ProductCard;

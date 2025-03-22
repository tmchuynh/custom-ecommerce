"use client";
import { Color, ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { JSX, useState } from "react";
import CartAndFavoritesButtons from "./CartAndFavoriteButtons";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import { Card, CardContent } from "./ui/card";
import components from "./ProductDetails";

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
  showColors = true,
  showButtons = true,
}: {
  product: ProductType;
  index: number;
  page?: boolean;
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

  return (
    <Card
      key={index}
      className={cn("border-none shadow-none", {
        "p-0": page,
      })}
    >
      <CardContent className={cn("p-0 relative", { "md:h-[40em]": page })}>
        <ProductGallery
          page={page}
          images={product.images}
          panelsVisibility={false}
          selectedColor={selectedColor}
        />
        <div
          className={cn(" flex flex-col justify-between h-1/2 lg:h-1/2 -mt-6", {
            "border-b border-x rounded-2xl shadow-md": page,
          })}
        >
          {(showColors || showButtons) && (
            <div className={`${colorsContainerClassName} row-span-1`}>
              {showColors && (
                <components.ProductColors
                  product={product}
                  selectedColor={selectedColor}
                  relatedProduct={relatedProduct}
                  setSelectedColor={setSelectedColor}
                />
              )}
              {showButtons && (
                <CartAndFavoritesButtons
                  product={product}
                  page={page}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

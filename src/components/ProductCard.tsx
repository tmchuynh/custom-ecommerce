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
  relatedProduct = false,
  cardClassName = "border-none shadow-none",
  contentClassName = "p-0 relative",
  infoContainerClassName = "-mt-9",
  colorsContainerClassName = "flex flex-col items-center justify-between md:h-1/2",
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

  return (
    <Card
      key={index}
      className={cn(cardClassName, {
        "p-0": page,
      })}
    >
      <CardContent className={cn(contentClassName, { [`${minHeight}`]: page })}>
        <ProductGallery
          page={page}
          images={product.images}
          panelsVisibility={false}
          selectedColor={selectedColor}
        />
        <div
          className={cn(infoContainerClassName, {
            "border-b border-x rounded-2xl shadow-md h-[30em] grid grid-rows-2 grid-flow-row-dense":
              page,
          })}
        >
          <div className="row-span-2">
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

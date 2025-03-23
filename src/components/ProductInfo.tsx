import { useCart } from "@/app/context/cartContext";
import { Color, ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { JSX, useEffect, useState } from "react";
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

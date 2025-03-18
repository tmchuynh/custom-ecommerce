import { useCart } from "@/app/context/cartContext";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { JSX } from "react";

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
  selectedGender,
  selectedCategory,
  selectedItem,
}: {
  product: any;
  index: number;
  selectedGender: string;
  selectedCategory: string;
  selectedItem: string;
}): JSX.Element => {
  const { addToCart } = useCart();

  /**
   * Handles adding a product to the cart.
   *
   * @param {any} product - The product to add to the cart.
   * @param {number} id - The ID of the product (using index as fallback).
   * @returns {void}
   */
  const handleAddToCart = (product: any, id: number): void => {
    addToCart({
      id: id, // using the index as a fallback ID; consider using a unique product identifier if available
      name: product.name,
      description: product.description,
      price: parseFloat(product.price.replace("$", "")),
      quantity: 1,
      imageSrc: product.imageSrc,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const productLink = `/shopping/${selectedGender}/${selectedCategory}/${selectedItem}/${product.name
    .toLowerCase()
    .replaceAll(" ", "-")}`;

  return (
    <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
      {product.imageSrc ? (
        <Skeleton className="h-[175] w-full rounded-xl" />
      ) : (
        <div className="w-full h-[175] bg-gray-200" />
      )}
      <h3 className="text-lg font-semibold mt-4">
        <a href={productLink}>{product.name}</a>
      </h3>
      <p className="text-sm text-gray-500 mt-2">{product.price}</p>
      <Button
        onClick={() => handleAddToCart(product, index)}
        className="mt-4 text-white bg-indigo-600 px-4 py-2 rounded-lg"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;

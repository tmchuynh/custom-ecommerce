import { useCart } from "@/app/context/cartContext";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { JSX } from "react";
import QuantityButtons from "./Quantity";
import { Card, CardContent, CardFooter } from "./ui/card";

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
  const { addToCart, cartItems } = useCart();
  const foundItem = cartItems.find((item) => item.id === index.toString());

  /**
   * Handles adding a product to the cart.
   *
   * @param {any} product - The product to add to the cart.
   * @param {number} id - The ID of the product (using index as fallback).
   * @returns {void}
   */
  const handleAddToCart = (product: any, id: string): void => {
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
    .replaceAll(" ", "-")
    .replaceAll("'s", "")}`;

  return (
    <Card
      key={index}
      className="p-4 rounded-lg shadow-lg flex flex-col justify-around"
    >
      {product.imageSrc ? (
        // <Image
        //   src={product.imageSrc}
        //   alt={product.name} // Use a meaningful alt description
        //   width={400}
        //   height={400}
        //   className="w-full h-64 object-cover"
        // />
        <Skeleton className="h-[175] w-full rounded-xl" />
      ) : (
        <div className="w-full h-[175]" />
      )}
      <CardContent className="flex flex-col justify-between h-1/2">
        <div>
          <h3 className="text-lg font-semibold mt-4">
            <a href={productLink}>{product.name}</a>
          </h3>
          <p className="text-sm mt-2">{product.description}</p>
        </div>
        <p className="text-md mt-2">{product.price}</p>
      </CardContent>
      <CardFooter>
        {foundItem && foundItem.quantity > 0 ? (
          <QuantityButtons itemId={index} />
        ) : (
          <Button onClick={() => handleAddToCart(product, product.name)}>
            Add to Cart
            <span className="sr-only">, {product.name}</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

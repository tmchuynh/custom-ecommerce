import { useCart } from "@/app/context/cartContext";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const ProductCard = ({ product, index }: { product: any; index: number }) => {
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

  return (
    <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
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
        <div className="w-full h-[175] bg-gray-200" />
      )}
      <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
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

// components/RelatedProducts.tsx
import React from "react";
import Image from "next/image";
import { useCart } from "@/app/context/cartContext";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const RelatedProducts = ({ relatedProducts }: { relatedProducts: any[] }) => {
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (product: any, id: number) => {
    const price =
      typeof product.price === "string"
        ? parseFloat(product.price.replace("$", ""))
        : product.price;

    const cartItem = {
      id: id,
      name: product.name,
      description: product.description,
      price: price,
      quantity: 1,
      imageSrc: product.imageSrc,
    };

    // Directly call addToCart. The cart context will update quantity if it already exists.
    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`);
  };
  return (
    <section
      aria-labelledby="related-heading"
      className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0"
    >
      <h2 id="related-heading" className="text-xl font-bold text-gray-900">
        Customers also bought
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {relatedProducts.map((product, index) => (
          <div key={index}>
            <div className="relative">
              <div className="relative h-72 w-full overflow-hidden rounded-lg">
                {/* <Image
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  width={1920}
                  priority
                  height={1080}
                  objectFit="cover"
                  className="rounded-lg"
                /> */}
                <Skeleton className="h-[175] w-full rounded-xl" />
              </div>
              <div className="relative mt-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
              <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black opacity-50"
                />
                <p className="relative text-lg font-semibold text-white">
                  {product.price}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleAddToCart(product, index)}>
                Add to Cart
                <span className="sr-only">, {product.name}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;

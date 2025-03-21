// components/RelatedProducts.tsx
import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { HandleAddToCart } from "@/lib/utils";

const RelatedProducts = ({ relatedProducts }: { relatedProducts: any[] }) => {
  return (
    <section
      aria-labelledby="related-heading"
      className="mt-10 px-4 py-16 sm:px-0"
    >
      <h3 id="related-heading" className="text-lg font-medium mb-4">
        Customers also bought
      </h3>

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
                <h3 className="text-lg font-medium mb-4">{product.name}</h3>
                <p className="mt-1 text-sm">{product.color}</p>
              </div>
              <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black opacity-50"
                />
                <p className="relative text-lg font-semibold">
                  {product.price}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => HandleAddToCart(product, product.name)}>
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

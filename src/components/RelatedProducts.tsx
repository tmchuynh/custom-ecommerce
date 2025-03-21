// components/RelatedProducts.tsx
import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useCart } from "@/app/context/cartContext";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Color } from "@/lib/types";
import { Radio, RadioGroup } from "@headlessui/react";
import { generateRandomNumberArray } from "@/lib/utils";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const RelatedProducts = ({ relatedProducts }: { relatedProducts: any[] }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any, id: string) => {
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

    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`);
  };

  // Generate a random array for the skeleton carousel.
  const randomArray = useMemo(() => {
    const randomLength = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    const randomMin = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    const randomMax = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    return generateRandomNumberArray(randomLength, randomMin, randomMax);
  }, []);
  const total = randomArray.length;
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log("total", total);
  console.log("selectedIndex", selectedIndex);
  console.log(randomArray);

  // Compute the indices of skeleton items to display (showing three items).
  const visibleIndices = () => {
    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i);
    } else if (selectedIndex <= 1) {
      return [0, 1, 2];
    } else if (selectedIndex >= total - 2) {
      return [total - 3, total - 2, total - 1];
    } else {
      return [selectedIndex - 1, selectedIndex, selectedIndex + 1];
    }
  };

  // Arrow navigation functions with looping behavior.
  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + total) % total);
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      aria-labelledby="related-heading"
      className="mt-10 px-4 py-16 sm:px-0"
    >
      <h3 id="related-heading" className="text-lg font-medium mb-4">
        Customers also bought
      </h3>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {relatedProducts.map((product, prodIndex) => (
          <div key={prodIndex}>
            <div className="relative">
              <div className="relative h-72 w-full  overflow-hidden rounded-lg">
                {/* Carousel Container (displayed as a horizontal flexbox) */}
                {randomArray.map((_, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square w-full h-full overflow-hidden border rounded-2xl ${
                      visibleIndices().includes(index) ? "block" : "hidden"
                    }`}
                  >
                    <Skeleton
                      text={(selectedIndex + 1).toString()}
                      className="h-full w-full rounded-xl hidden md:flex"
                    />
                  </div>
                ))}
                {/* Arrow Navigation Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2"
                  aria-label="Previous"
                >
                  <FiArrowLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2"
                  aria-label="Next"
                >
                  <FiArrowRight />
                </Button>
              </div>
              <div className="relative mt-4">
                <h3 className="text-lg font-medium mb-4">{product.name}</h3>
                <p className="mt-1 text-sm">{product.color}</p>
                <p className="relative text-lg font-semibold">
                  {product.price}
                </p>
                <fieldset aria-label="Choose a color" className="mt-2">
                  <RadioGroup className="flex items-center gap-x-3">
                    {product.colors.map((color: Color, index: number) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Radio
                              key={index}
                              value={color}
                              aria-label={color.name}
                              className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
                            >
                              <span
                                aria-hidden="true"
                                className="bg-dynamic size-8 rounded-full border"
                                style={
                                  {
                                    "--bg-color": color.bgColor,
                                  } as React.CSSProperties
                                }
                              />
                            </Radio>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{color.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleAddToCart(product, product.name)}>
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

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
import { Color, ProductType } from "@/lib/types";
import { Radio, RadioGroup } from "@headlessui/react";
import { generateRandomNumberArray } from "@/lib/utils";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ProductInfo from "./ProductInfo";
import ProductGallery from "./ProductGallery";
import { Card, CardContent, CardFooter } from "./ui/card";
import CartAndFavoritesButtons from "./CartAndFavoriteButtons";
import ProductCard from "./ProductCard";

const RelatedProducts = ({
  relatedProducts,
}: {
  relatedProducts: ProductType[];
}) => {
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
          <ProductCard
            product={product}
            index={prodIndex}
            page={false}
            key={prodIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;

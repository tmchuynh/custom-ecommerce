"use client";

import { useWishlist } from "@/app/context/wishlistContext";
import { Button } from "@/components/ui/button";
import { StoreItem } from "@/lib/types";
import { ShoppingBagIcon } from "lucide-react";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sneakersData = Array.from({ length: 55 }, (_, index) => ({
  id: index + 1,
  href: "#",
  name: `Sneaker ${index + 1}`,
  description:
    "Look like a visionary CEO and wear the same black t-shirt every day.",
  color: "Black",
  availableColors: [
    { name: "Black", colorBg: "#111827" },
    { name: "Brass", colorBg: "#FDE68A" },
    { name: "Chrome", colorBg: "#E5E7EB" },
  ],
  price: (index + 1) * 10 + 50, // Price starts at 60 and increments
  imageSrc: "https://via.placeholder.com/300x300.png?text=Sneaker+Image", // Placeholder image URL
  imageAlt: `Sneaker ${index + 1}`,
}));

const WomensSneakersPage = () => {
  const { addToWishlist } = useWishlist(); // Access addToWishlist function from context
  const [quickView, setQuickView] = useState<number | null>(null); // To handle quick view popup

  const handleAddToWishlist = (sneaker: StoreItem) => {
    addToWishlist(sneaker); // Add sneaker to wishlist
  };

  const handleQuickView = (id: number) => {
    setQuickView(id === quickView ? null : id); // Toggle quick view for the clicked sneaker
  };

  const handleDetailsNavigation = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    console.log(`Navigating to details page for sneaker ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Women's Sneakers
      </h1>

      {/* Sneakers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-14">
        {sneakersData.map((sneaker) => (
          <div key={sneaker.id}>
            <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
              <img
                alt={sneaker.imageAlt}
                src={sneaker.imageSrc}
                className="aspect-3/4 w-full bg-gray-200 object-cover sm:aspect-auto sm:h-96"
              />
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium flex justify-between items-center">
                  <a href={sneaker.href} className="text-accent">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {sneaker.name}
                  </a>
                  <p className="text-base font-medium">${sneaker.price}</p>
                </h3>
                <p className="text-sm">{sneaker.description}</p>
                <div className="flex flex-1 flex-col justify-end">
                  <div>
                    <h4 className="sr-only">Available colors</h4>
                    <ul
                      role="list"
                      className="mt-auto flex items-start space-x-3 py-4"
                    >
                      {sneaker.availableColors.map((color) => (
                        <li
                          key={color.name}
                          style={{ backgroundColor: color.colorBg }}
                          className="size-4 rounded-full border border-black/10"
                        >
                          <span className="sr-only">{color.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5 flex justify-between max-w-1/4 mx-auto">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FaHeart />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ShoppingBagIcon />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomensSneakersPage;

"use client";

import Image from "next/image"; // Assuming you're using Image component
import { useWishlist } from "../context/wishlistContext";

/**
 * Renders the Wishlist page component.
 *
 * Displays a list of items that the user has added to their wishlist.
 * If the wishlist is empty, shows a message indicating that.
 * For each item in the wishlist, displays:
 * - Product image
 * - Product name
 * - Price
 * - Remove button to delete item from wishlist
 *
 * @component
 * @example
 * ```tsx
 * <WishlistPage />
 * ```
 *
 * @returns {JSX.Element} A responsive page displaying wishlist items or empty state message
 */
const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist(); // Access wishlist data

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {wishlistItems.length === 0 ? (
        <div className="h-[20rem] lg:h-[40rem] 2xl:h-[60rem] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-extrabold text-center mb-8">
            Your Wishlist
          </h1>
          <p className="text-xl text-center">Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col gap-8">
            {wishlistItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between border-b border-gray-200 py-6"
              >
                <div className="flex items-center space-x-6">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <div className="text-lg font-medium text-gray-900">
                    {item.name}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-lg font-medium text-gray-900">
                    ${item.price}
                  </div>

                  <button
                    onClick={() => removeFromWishlist(item.name)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

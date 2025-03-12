"use client";

import Image from "next/image"; // Assuming you're using Image component
import { useWishlist } from "../context/wishlistContext";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist(); // Access wishlist data

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Your Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-xl text-center text-gray-600">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col gap-8">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 py-6"
              >
                <div className="flex items-center space-x-6">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
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
                    onClick={() => removeFromWishlist(item.id)}
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
